const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ts = require('typescript');

function updateAppModule(entity) {
  const appModulePath = path.resolve(__dirname, 'src/app.module.ts');
  if (!fs.existsSync(appModulePath)) return;
  let content = fs.readFileSync(appModulePath, 'utf8');
  const importLine = `import { ${capitalize(entity)}Module } from './modules/${entity.toLowerCase()}/${entity.toLowerCase()}.module';`;
  if (!content.includes(importLine)) {
    content = importLine + '\n' + content;
  }
  // Regex para encontrar o array imports
  const importsRegex = /(imports:\s*\[)([\s\S]*?)(\])/m;
  const match = content.match(importsRegex);
  if (match && !match[2].includes(`${capitalize(entity)}Module`)) {
    const newImports = match[1] + match[2].replace(/\n\s*\]/, '') + `\n    ${capitalize(entity)}Module,` + match[3];
    content = content.replace(importsRegex, newImports);
  }
  fs.writeFileSync(appModulePath, content, 'utf8');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractDtoFields(dtoPath) {
  if (!fs.existsSync(dtoPath)) return [];
  const fileContent = fs.readFileSync(dtoPath, 'utf8');
  const sourceFile = ts.createSourceFile(dtoPath, fileContent, ts.ScriptTarget.Latest, true);
  const fields = [];
  ts.forEachChild(sourceFile, node => {
    if (ts.isClassDeclaration(node)) {
      node.members.forEach(member => {
        if (ts.isPropertyDeclaration(member) && member.name && member.type) {
          fields.push({
            name: member.name.getText(),
            type: member.type.getText(),
          });
        }
      });
    }
  });
  return fields;
}

module.exports = function (plop) {
  function deleteEntities(entity) {
    const entityPath = path.resolve(__dirname, `src/dtos/${entity.toLowerCase()}/`);
    if (fs.existsSync(entityPath)) {
      fs.readdirSync(entityPath).forEach(file => {
        if (file.endsWith('.entity.ts')) {
          console.warn(`🗑️  Removendo entity desnecessária: ${file}`);
          fs.unlinkSync(path.join(entityPath, file));
        }
      });
    }
  }

  function getDtoImports(entity) {
    const dtoPath = path.resolve(__dirname, `src/dtos/${entity.toLowerCase()}/`);
    if (!fs.existsSync(dtoPath)) {
      console.warn(`⚠️  DTOs não encontrados para ${entity}: ${dtoPath}. Pulando importação...`);
      return '';
    }

    // Filtramos apenas os DTOs necessários para CRUD
    const dtoFiles = [`create-${entity.toLowerCase()}.dto.ts`, `update-${entity.toLowerCase()}.dto.ts`];
    const imports = dtoFiles
      .filter(file => fs.existsSync(path.join(dtoPath, file)))
      .map(file => `import { ${file.replace('.dto.ts', '')} } from '../../dtos/${entity.toLowerCase()}/${file}';`);

    return imports.join('\n');
  }

  function templateExists(templateName) {
    const templatePath = path.join(__dirname, 'plop-templates', `${templateName}.hbs`);
    return fs.existsSync(templatePath);
  }

  plop.setGenerator('scaffold', {
    description: 'Gerar módulo CRUD modular e escalável',
    prompts: [
      {
        type: 'input',
        name: 'entity',
        message: 'Nome da entidade (exatamente como no Prisma Schema):',
        validate: v => !!v || 'Campo obrigatório',
      },
      {
        type: 'checkbox',
        name: 'layers',
        message: 'Quais camadas deseja gerar?',
        choices: [
          { name: 'mappers', checked: true },
          { name: 'controllers', checked: true },
          { name: 'services', checked: true },
          { name: 'repository', checked: true },
          { name: 'interface', checked: true },
          { name: 'module', checked: true },
          { name: 'index', checked: true },
        ],
      },
    ],
    actions: function (data) {
      const actions = [];
      const entity = data.entity;
      const entityName = entity.toLowerCase();
      const modulePath = `src/modules/${entityName}`;
      const layers = data.layers;
      // Listas para module dinâmico
      const services = [];
      const controllers = [];
      let repository = null;
      let repositoryPath = null;
      let mapper = null;
      // Interface
      if (layers.includes('interface')) {
        actions.push({
          type: 'add',
          path: `${modulePath}/interfaces/${entityName}.interface.ts`,
          templateFile: 'plop-templates/interface.hbs',
        });
      }
      // Repository (sempre Prisma)
      if (layers.includes('repository')) {
        repository = `${capitalize(entity)}PrismaRepository`;
        repositoryPath = `prisma-repositorys/${entityName}.prisma.repository`;
        actions.push({
          type: 'add',
          path: `${modulePath}/prisma-repositorys/${entityName}.prisma.repository.ts`,
          templateFile: 'plop-templates/prisma-repository.hbs',
        });
      }
      // Mapper
      if (layers.includes('mappers')) {
        const createDtoPath = path.resolve(__dirname, `src/dtos/${entityName}/dto/create-${entityName}.dto.ts`);
        const updateDtoPath = path.resolve(__dirname, `src/dtos/${entityName}/dto/update-${entityName}.dto.ts`);
        const createFields = extractDtoFields(createDtoPath);
        const updateFields = extractDtoFields(updateDtoPath);
        mapper = `${capitalize(entity)}Mapper`;
        actions.push({
          type: 'add',
          path: `${modulePath}/mappers/${entityName}.mapper.ts`,
          templateFile: 'plop-templates/mapper.hbs',
          data: {
            createFields,
            updateFields,
            entity: capitalize(entity),
          },
        });
      }
      // Services
      if (layers.includes('services')) {
        const serviceNames = [
          `Create${capitalize(entity)}Service`,
          `Get${capitalize(entity)}Service`,
          `GetById${capitalize(entity)}Service`,
          `Update${capitalize(entity)}Service`,
          `Delete${capitalize(entity)}Service`,
        ];
        const serviceTemplates = [
          'create-service.hbs',
          'get-service.hbs',
          'getById-service.hbs',
          'update-service.hbs',
          'delete-service.hbs',
        ];
        const fileNames = [
          `create-${entityName}.service.ts`,
          `get-${entityName}.service.ts`,
          `get-by-id-${entityName}.service.ts`,
          `update-${entityName}.service.ts`,
          `delete-${entityName}.service.ts`,
        ];
        serviceNames.forEach((service, idx) => {
          services.push(service);
          actions.push({
            type: 'add',
            path: `${modulePath}/services/${fileNames[idx]}`,
            templateFile: `plop-templates/${serviceTemplates[idx]}`,
          });
        });
      }
      // Controllers (sempre todos individuais)
      if (layers.includes('controllers')) {
        const controllerNames = [
          `Create${capitalize(entity)}Controller`,
          `Get${capitalize(entity)}Controller`,
          `GetById${capitalize(entity)}Controller`,
          `Update${capitalize(entity)}Controller`,
          `Delete${capitalize(entity)}Controller`,
        ];
        const controllerTemplates = [
          'create-controller.hbs',
          'get-controller.hbs',
          'getById-controller.hbs',
          'update-controller.hbs',
          'delete-controller.hbs',
        ];
        const fileNames = [
          `create-${entityName}.controller.ts`,
          `get-${entityName}.controller.ts`,
          `get-by-id-${entityName}.controller.ts`,
          `update-${entityName}.controller.ts`,
          `delete-${entityName}.controller.ts`,
        ];
        controllerNames.forEach((ctrl, idx) => {
          controllers.push(ctrl);
          actions.push({
            type: 'add',
            path: `${modulePath}/controllers/${fileNames[idx]}`,
            templateFile: `plop-templates/${controllerTemplates[idx]}`,
          });
        });
      }
      // Module
      if (layers.includes('module')) {
        actions.push({
          type: 'add',
          path: `${modulePath}/${entityName}.module.ts`,
          templateFile: 'plop-templates/module.hbs',
          data: {
            entity: capitalize(entity),
            services,
            controllers,
            repository,
            repositoryPath,
            mapper,
          },
        });
      }
      // Index
      if (layers.includes('index')) {
        actions.push({
          type: 'add',
          path: `${modulePath}/index.ts`,
          templateFile: 'plop-templates/index.hbs',
        });
      }
      // Atualizar app.module.ts
      actions.push(function () {
        if (layers.includes('module')) {
          updateAppModule(entity);
        }
        return 'app.module.ts atualizado';
      });
      // Prisma generate sempre após gerar o módulo
      actions.push(function () {
        try {
          execSync('npx prisma generate', { stdio: 'inherit' });
        } catch (error) {
          console.error('Erro ao rodar prisma generate:', error.message);
        }
        return 'Prisma client/DTOs atualizados';
      });
      return actions;
    },
  });
};
