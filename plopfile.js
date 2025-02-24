const fs = require('fs');
const path = require('path');

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
    description: 'Gera scaffold completo baseado no Prisma',
    prompts: [
      {
        type: 'input',
        name: 'entity',
        message: 'Nome da entidade (exatamente como no Prisma Schema):',
        validate: (input) => !!input.match(/^[A-Z][a-zA-Z]+$/) || 'Use PascalCase! Ex: User'
      }
    ],
    actions: (data) => {
      // 🔥 Remove entities antes de gerar os arquivos
      deleteEntities(data.entity);

      const actions = [];

      // Importação dos DTOs corretamente organizados
      const dtoImports = getDtoImports(data.entity);

      const filesToGenerate = [
        { type: 'controller', actions: ['create', 'get', 'getById', 'update', 'delete'] },
        { type: 'service', actions: ['create', 'get', 'getById', 'update', 'delete'] },
        { type: 'repository', file: 'prisma-repository' },
        { type: 'module', file: 'module' },
        { type: 'interface', file: 'interface' }
      ];

      filesToGenerate.forEach(({ type, actions: fileActions, file }) => {
        if (fileActions) {
          fileActions.forEach(action => {
            const templateFile = `${action}-${type}`;
            if (templateExists(templateFile)) {
              actions.push({
                type: 'add',
                path: `src/modules/{{dashCase entity}}/${type}s/${action}-{{dashCase entity}}.${type}.ts`,
                templateFile: `plop-templates/${templateFile}.hbs`
              });
            } else {
              console.warn(`⚠️  Template "${templateFile}.hbs" não encontrado. Pulando...`);
            }
          });
        } else if (file) {
          if (templateExists(file)) {
            actions.push({
              type: 'add',
              path: `src/modules/{{dashCase entity}}/${file === 'module' ? '' : file + 's/'}{{dashCase entity}}.${file}.ts`,
              templateFile: `plop-templates/${file}.hbs`,
              data: { dtoImports }
            });
          } else {
            console.warn(`⚠️  Template "${file}.hbs" não encontrado. Pulando...`);
          }
        }
      });

      actions.push({
        type: 'add',
        path: 'src/modules/{{dashCase entity}}/index.ts',
        template: "export * from './{{dashCase entity}}.module';\n"
      });

      return actions;
    }
  });
};
