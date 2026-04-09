# API REST - Plataforma de Estudos ENADE

Backend desenvolvido para o Trabalho 05 da disciplina de Técnicas de Integração de Sistemas. Esta API RESTful gerencia dados de Cursos, Estudantes e Questões, focando na preparação de alunos universitários para o exame do ENADE.

O projeto contempla as etapas de modelagem, implementação e deploy da aplicação, cumprindo os requisitos de domínio livre e operações de CRUD completas para 3 recursos distintos.

## Deploy (Aplicação Online)
A API está hospedada publicamente no Render e conectada ao MongoDB Atlas. 
Você pode testar os endpoints acessando a URL base abaixo:
**https://projeto-api-rest-enade.onrender.com**

## 🛠️ Tecnologias Utilizadas
* **Node.js** com **Express** (Framework backend) 
* **MongoDB** (Banco de dados NoSQL)
* **Mongoose** (Modelagem de dados e validação)
* **Render** (Hospedagem e Deploy)

## 📋 Recursos da API
A API expõe 3 recursos principais, todos com no mínimo 5 campos e suporte a operações CRUD (GET, POST, PUT, DELETE):
1. `/cursos` - Gerenciamento das diretrizes dos cursos.
2. `/estudantes` - Gerenciamento dos alunos (relacionado a Cursos).
3. `/questoes` - Gerenciamento do banco de questões (relacionado a Cursos).

## Como executar o projeto localmente

Siga os passos abaixo para rodar a aplicação em sua máquina:

**1. Clone este repositório:**
\`\`\`bash
git clone https://github.com/josearthurleitebrito/Projeto-API-Rest-ENADE.git
\`\`\`

**2. Acesse a pasta do projeto:**
\`\`\`bash
cd api-enade
\`\`\`

**3. Instale as dependências:**
\`\`\`bash
npm install
\`\`\`

**4. Configure as Variáveis de Ambiente:**
Crie um arquivo chamado `.env` na raiz do projeto e adicione a sua string de conexão do MongoDB (seja ela local ou do Atlas):
\`\`\`env
DATABASE_URL="sua_string_de_conexao_do_mongodb_aqui"
\`\`\`

**5. Inicie o servidor:**
\`\`\`bash
npm run dev
\`\`\`
O servidor iniciará na porta padrão (acesse `http://localhost:3000`).

## Autor e Contribuição
* **José Arthur Leite Brito (2315760)** - [[Link do GitHub]](https://github.com/josearthurleitebrito)

*Projeto desenvolvido de forma integral e individual. Todas as etapas (modelagem do banco de dados, implementação do CRUD, testes das rotas e deploy na plataforma Render) foram executadas pelo autor, com o histórico de commits evidenciando o progresso da aplicação.*
