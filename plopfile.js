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
  if (!fs.existsSync(dtoPath)) {
    console.warn(`⚠️  DTO não encontrado: ${dtoPath}`);
    return [];
  }
  
  const fileContent = fs.readFileSync(dtoPath, 'utf8');
  const sourceFile = ts.createSourceFile(dtoPath, fileContent, ts.ScriptTarget.Latest, true);
  const fields = [];
  
  ts.forEachChild(sourceFile, node => {
    if (ts.isClassDeclaration(node)) {
      node.members.forEach(member => {
        if (ts.isPropertyDeclaration(member) && member.name && member.type) {
          const fieldName = member.name.getText();
          const fieldType = member.type.getText();
          
          // Pular campos automáticos
          if (['id', 'createdAt', 'updatedAt'].includes(fieldName)) {
            return;
          }
          
          fields.push({
            name: fieldName,
            type: fieldType,
            isOptional: member.questionToken !== undefined,
          });
        }
      });
    }
  });
  
  console.log(`📋 Campos extraídos de ${dtoPath}:`, fields.map(f => f.name));
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
          force: true,
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
          force: true,
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
          force: true,
          data: {
            createFields,
            updateFields,
            entity: capitalize(entity),
          },
        });
      }
      // Services (service único)
      if (layers.includes('services')) {
        const serviceNames = [
          `${capitalize(entity)}Service`,
        ];
        const serviceTemplates = [
          'service.hbs',
        ];
        const fileNames = [
          `${entityName}.service.ts`,
        ];
        serviceNames.forEach((service, idx) => {
          services.push(service);
          actions.push({
            type: 'add',
            path: `${modulePath}/services/${fileNames[idx]}`,
            templateFile: `plop-templates/${serviceTemplates[idx]}`,
            force: true,
          });
        });
      }
      // Controllers (controller único)
      if (layers.includes('controllers')) {
        const controllerNames = [
          `${capitalize(entity)}Controller`,
        ];
        const controllerTemplates = [
          'controller.hbs',
        ];
        const fileNames = [
          `${entityName}.controller.ts`,
        ];
        controllerNames.forEach((ctrl, idx) => {
          controllers.push(ctrl);
          actions.push({
            type: 'add',
            path: `${modulePath}/controllers/${fileNames[idx]}`,
            templateFile: `plop-templates/${controllerTemplates[idx]}`,
            force: true,
          });
        });
      }
      // Module
      if (layers.includes('module')) {
        actions.push({
          type: 'add',
          path: `${modulePath}/${entityName}.module.ts`,
          templateFile: 'plop-templates/module.hbs',
          force: true,
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
          force: true,
        });
      }
      // Atualizar app.module.ts
      actions.push(function () {
        if (layers.includes('module')) {
          updateAppModule(entity);
        }
        return 'app.module.ts atualizado';
      });
      return actions;
    },
  });

  // Helper para identificar campos de relação (terminam com Id)
  plop.setHelper('isRelation', function (fieldName) {
    return /Id$/i.test(fieldName);
  });
  // Helper para gerar nome da relação (remove 'Id' do final e camelCase)
  plop.setHelper('relationName', function (fieldName) {
    if (!/Id$/i.test(fieldName)) return fieldName;
    const base = fieldName.replace(/Id$/i, '');
    return base.charAt(0).toLowerCase() + base.slice(1);
  });
};
