📘 Projeto: Scaffold NestJS + Prisma + Plop
Este projeto é um scaffold para geração de CRUDs básicos utilizando NestJS, Prisma ORM, e Plop para automação. Ele segue os princípios do SOLID e Orientação a Objetos, separando cada método e módulo em suas respectivas pastas.

🚀 Tecnologias Utilizadas
NestJS → Framework modular para Node.js
Prisma ORM → ORM moderno para banco de dados
Plop.js → Gerador de código automatizado
Swagger NestJS → Documentação automática de APIs
ESLint + Prettier → Padronização e linting de código

📂 Estrutura do Projeto

📦 src/
 ┣ 📂 modules/              # Módulos do sistema (cada entidade terá um módulo separado)
 ┃ ┣ 📂 usuario/            # Exemplo de um módulo gerado (usuário)
 ┃ ┃ ┣ 📂 controllers/      # Controllers da entidade
 ┃ ┃ ┣ 📂 services/         # Serviços da entidade
 ┃ ┃ ┣ 📂 interfaces/       # Interface do repositório
 ┃ ┃ ┣ 📂 prisma-repositorys/ # Implementação do repositório Prisma
 ┃ ┃ ┗ usuario.module.ts    # Módulo principal da entidade
 ┣ 📂 dtos/                 # Data Transfer Objects (DTOS)
 ┣ 📂 prisma/               # Configuração global do Prisma
 ┃ ┣ prisma.module.ts       # Módulo global do Prisma
 ┃ ┗ prisma.service.ts      # Serviço de conexão com o banco
 ┣ 📂 plop-templates/       # Templates para geração automática de módulos
 ┣ main.ts                  # Arquivo principal de bootstrap
 ┗ app.module.ts            # Módulo raiz da aplicação

🔧 Configuração do Ambiente
git clone https://github.com/seu-repo/seu-projeto.git
cd seu-projeto
npm install

Configure as variáveis de ambientes no arquivo .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/teste?connection_limit=20&pool_timeout=10&connect_timeout=30"
npx prisma migrate dev
npx prisma generate

npm run start:dev -- --cache

Acesse a Documentação Swagger
Abra no navegador: http://localhost:3000/api

🛠 Geração Automática de Módulos com Plop
O Plop.js automatiza a criação de módulos CRUD. Para criar um novo módulo, execute:

npx plop scaffold

Siga as instruções e informe o nome da entidade (exemplo: Usuario). Isso criará automaticamente:

📂 src/modules/usuario/

Controllers
Services
Repository
Interfaces
DTOs

📌 Boas Práticas Utilizadas
✅ SOLID → Arquitetura modular e responsabilidade única
✅ Repository Pattern → Abstração da camada de banco de dados
✅ DTOs Automáticos → Geração automática via prisma-generator-nestjs-dto
✅ Plop.js → Automação de código para CRUDs
✅ Swagger → Documentação automática de APIs

📜 Licença
Este projeto está sob a licença MIT. Sinta-se livre para utilizá-lo e melhorá-lo. 💡