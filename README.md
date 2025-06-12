# 📘 Projeto: Scaffold NestJS + Prisma + Plop

Este projeto é um scaffold para geração rápida e padronizada de módulos no NestJS, utilizando Prisma, Plop e Automapper, seguindo Clean Architecture e boas práticas de escalabilidade e manutenibilidade.

## Visão Geral
- **NestJS** para estrutura modular e robusta
- **Prisma** como ORM
- **Plop** para geração automatizada de módulos (controllers, services, mappers, etc.)
- **Automapper** para mapeamento entre entidades e DTOs
- **@nestjsx/crud** para endpoints RESTful completos e customizáveis

## Pré-requisitos
- Node.js >= 16
- npm ou yarn
- Banco de dados configurado no Prisma

## Instalação
```bash
# Clone o repositório
git clone <url-do-repo>
cd Scaffold_Nestjs

# Instale as dependências
npm install
# ou
yarn install
```

## Dependências obrigatórias
```bash
npm install @nestjsx/crud @automapper/nestjs @automapper/core @automapper/classes @prisma/client reflect-metadata@~0.1.13
```

## Gerador de Módulos com Plop

Este projeto utiliza o [Plop](https://plopjs.com/) para gerar módulos completos seguindo Clean Architecture e boas práticas de NestJS + Prisma.

### Como gerar um novo módulo
```bash
npm run plop
# ou
yarn plop
```
Siga os prompts para informar o nome da entidade e as camadas desejadas.

### O que é gerado
- Controllers RESTful já integrados com @nestjsx/crud (com parâmetros customizados)
- Services enxutos, fortemente tipados
- Mappers com métodos `toCreateInput` e `toUpdateInput` gerados automaticamente a partir dos campos dos DTOs
- Providers e imports automáticos no módulo

### Exemplo de método gerado no Mapper
```ts
toCreateInput(dto: CreateUserDto): Prisma.UserCreateInput {
  return {
    // string
    name: dto.name,
    // string
    email: dto.email,
    // boolean
    isActive: dto.isActive,
  };
}
```
> **Dica:** Sempre revise e ajuste validações e transformações nos mappers conforme a regra de negócio.

### Padrão dos arquivos gerados
- Imports e providers automáticos no módulo
- Controllers com parâmetros do CRUD customizados (apenas limit, offset, page)
- Services apenas repassam para o repositório
- Mappers usam DTOs como entrada e saída, e validam/transformam antes de salvar no banco

## Customização
- Para alterar templates, edite os arquivos em `plop-templates/`
- Para adicionar novos campos ou camadas, ajuste o `plopfile.js`

## Dicas para manutenção
- Mantenha os DTOs sempre alinhados com o schema do Prisma
- Atualize dependências regularmente
- Sempre revise os métodos do mapper após gerar um novo módulo

## Contribuição
- Siga o padrão de commits do projeto (se houver)
- Abra issues e PRs para melhorias e correções

## Licença
MIT

---

## 🚀 Tecnologias Utilizadas
- **NestJS** → Framework modular para Node.js
- **Prisma ORM** → ORM moderno para banco de dados
- **Plop.js** → Gerador de código automatizado
- **Swagger NestJS** → Documentação automática de APIs
- **ESLint + Prettier** → Padronização e linting de código
- **Docker** → Containerização da aplicação e banco de dados

---

## 📂 Estrutura do Projeto

```
src/
 ┣ modules/
 ┃ ┣ <entidade>/
 ┃ ┃ ┣ controllers/         # Controllers individuais (GET, POST, PUT, DELETE, GET by ID)
 ┃ ┃ ┣ services/            # Serviços de aplicação (orquestração)
 ┃ ┃ ┣ dtos/                # Data Transfer Objects
 ┃ ┃ ┣ interfaces/          # Contratos de repositório
 ┃ ┃ ┣ prisma-repositorys/  # Implementação do repositório Prisma
 ┃ ┃ ┣ <entidade>.module.ts # Módulo principal da entidade
 ┃ ┃ ┗ index.ts             # Exporta o módulo
 ┣ prisma/                  # Configuração global do Prisma
 ┣ main.ts                  # Bootstrap da aplicação
 ┗ app.module.ts            # Módulo raiz
```

---

## 🏗️ Arquitetura

- **Clean Architecture, Clean Code e SOLID**: Separação clara de camadas, responsabilidade única e baixo acoplamento.
- **Bounded Contexts**: Cada módulo é isolado, sem dependências cruzadas.
- **Controllers individuais**: Um arquivo para cada operação (GET, POST, PUT, DELETE, GET by ID), todos usando @nestjsx/crud para filtros e paginação automáticos.
- **Injeção de dependências via interfaces**: Services dependem apenas de interfaces de repositório, facilitando testes e futuras trocas de implementação (ex: Prisma para outro ORM).
- **Código limpo e sem redundâncias**: Estrutura enxuta, fácil de manter e evoluir.

---

## 🛠 Geração Automática de Módulos com Plop

Para gerar um novo módulo (CRUD) com toda a estrutura pronta, execute:

```bash
npx plop scaffold
```

Você verá as seguintes perguntas:

```
? Nome da entidade (exatamente como no Prisma Schema): User
? Quais camadas deseja gerar? (Pressione espaço para selecionar/deselecionar)
 ◉ dtos
 ◉ mappers
 ◉ controller
 ◉ service
 ◉ repository
 ◉ interface
 ◉ module
```

- **Nome da entidade:**
  - Exemplo: `User` (use PascalCase, igual ao nome no schema do Prisma).
- **Quais camadas deseja gerar:**
  - Marque/desmarque conforme a necessidade.
  - "controller" gera todos os controllers individuais (GET, POST, PUT, DELETE, GET by ID) já com @nestjsx/crud.
  - "service", "repository", "interface", "dtos", "mappers", "module" geram as respectivas camadas.

### O que será gerado

Na pasta `src/modules/user/` (ou o nome da entidade escolhida):

- `controllers/` (um arquivo para cada operação CRUD, todos usando @nestjsx/crud)
- `services/`
- `dtos/`
- `interfaces/`
- `prisma-repositorys/` (ou `repositories/`)
- `user.module.ts`
- `index.ts`

Tudo pronto para uso, seguindo Clean Architecture, Clean Code e SOLID!

---

## 🐳 Rodando com Docker

1. Gere a imagem e suba os containers:

```bash
docker-compose up --build
```

2. Acesse a aplicação em [http://localhost:3000/api](http://localhost:3000/api)

- O banco de dados PostgreSQL estará disponível em `localhost:5432` (usuário: postgres, senha: postgres, banco: teste).

---

## 📌 Boas Práticas Utilizadas

- ✅ Clean Architecture, Clean Code e SOLID
- ✅ Bounded Contexts e modularização
- ✅ Separação clara de camadas (controllers, services, dtos, interfaces, repositórios)
- ✅ Repository Pattern com interfaces e DI
- ✅ DTOs validados com class-validator
- ✅ Plop.js para automação de código
- ✅ Swagger para documentação automática
- ✅ Docker para desenvolvimento e produção

---

## 📜 Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizá-lo e melhorá-lo. 💡

---

## 👤 Autor

Este scaffold foi idealizado e mantido por [gustavosillva0256](https://github.com/gustavosillva0256).

Sinta-se à vontade para contribuir, sugerir melhorias ou dar uma estrela no repositório!

---

## 🔄 Fluxo de Sincronização entre Prisma, DTOs e Plop

Para garantir que tudo funcione perfeitamente, siga SEMPRE esta ordem ao alterar modelos ou relacionamentos no Prisma:

1. **Atualize o arquivo `prisma/schema.prisma`**
   - Ajuste modelos, enums e relacionamentos conforme necessário.
   - Certifique-se de que o bloco `generator nestjsDto` está presente e configurado para:
     - `classValidation = true` (gera DTOs já com class-validator)
     - `addSwaggerDecorators = true` (gera DTOs já com decorators do Swagger)
     - `output` apontando para `../src/dtos` (ou o local desejado)

2. **Rode as migrations do Prisma**
   ```bash
   npx prisma migrate dev
   ```
   Isso atualiza o banco de dados conforme o novo schema.

3. **Gere o Prisma Client e os DTOs**
   ```bash
   npx prisma generate
   ```
   Isso gera o Prisma Client e os DTOs alinhados com o padrão do projeto (class-validator, Swagger, etc).

4. **Gere os módulos com o Plop**
   ```bash
   npx plop scaffold
   ```
   Agora, com DTOs e banco sincronizados, o Plop irá gerar módulos, controllers, services, etc., já refletindo o schema atualizado.

> **Importante:**
> - Sempre siga essa ordem para evitar bugs, redundância ou código fora do escopo.
> - O Plop depende dos DTOs gerados pelo Prisma para criar os arquivos corretos.
> - O generator nestjsDto deve estar sempre alinhado com as práticas do projeto (class-validator, Swagger, etc).

> **Automação:**
> - Ao gerar um novo módulo com o Plop, o arquivo `app.module.ts` é atualizado automaticamente.
> - O import do novo módulo e sua referência no array `imports` são inseridos sem necessidade de edição manual.
