# InstaBytes

**InstaBytes** é um projeto desenvolvido durante a Imersão Back-end da Alura em parceria com a Google. Ele permite a criação e gerenciamento de posts, incluindo o upload de imagens e a geração de descrições automáticas utilizando o modelo Google Gemini.

## Tecnologias Utilizadas

- **Node.js**: Framework principal para o back-end.
- **Express.js**: Framework para criação de rotas e middleware.
- **MongoDB Atlas**: Banco de dados não relacional para armazenar os posts.
- **Multer**: Middleware para upload de arquivos.
- **Cors**: Gerenciamento de políticas de acesso Cross-Origin.
- **Google Gemini**: Modelo de geração de conteúdo usado para descrever imagens.

---

## Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Rafael-Russo/InstaBytes.git
   cd instabytes
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração do ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```plaintext
   STRING_CONEXAO=URL_DE_CONEXAO_MONGO_ATLAS
   GEMINI_API_KEY=SUA_API_KEY_DO_GOOGLE_GEMINI
   ```

   Substitua `URL_DE_CONEXAO_MONGO_ATLAS` pela string de conexão do MongoDB Atlas e `SUA_API_KEY_DO_GOOGLE_GEMINI` pela sua chave de API do Google Gemini.

4. **Estrutura de Banco de Dados**:
   - Nome do Banco: `instabytes`
   - Collection: `posts`
   - Certifique-se de que o banco está configurado no MongoDB Atlas e acessível através da string de conexão.

5. **Inicie o servidor**:
   ```bash
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3000`.

---

## Rotas da API

### **GET /posts**
- **Descrição**: Lista todos os posts salvos no banco de dados.
- **Resposta**: 
  ```json
  [
    {
      "_id": "id_do_post",
      "descricao": "Descrição do post",
      "imgUrl": "URL da imagem",
      "alt": "Texto alternativo"
    }
  ]
  ```

### **POST /posts**
- **Descrição**: Adiciona um novo post.
- **Corpo da Requisição**:
  ```json
  {
    "descricao": "Descrição do post",
    "imgUrl": "URL da imagem",
    "alt": "Texto alternativo"
  }
  ```

### **POST /upload**
- **Descrição**: Realiza o upload de uma imagem e cria um novo post associado.
- **Cabeçalho**: Enviar um arquivo com a key `imagem` no formulário multipart/form-data.
- **Resposta**:
  ```json
  {
    "_id": "id_do_post",
    "descricao": "",
    "imgUrl": "nome_do_arquivo.png",
    "alt": ""
  }
  ```

### **PUT /upload/:id**
- **Descrição**: Atualiza um post com uma descrição gerada automaticamente pelo Google Gemini.
- **Corpo da Requisição**:
  ```json
  {
    "alt": "Texto alternativo"
  }
  ```
- **Resposta**:
  ```json
  {
    "_id": "id_do_post",
    "descricao": "Descrição gerada automaticamente",
    "imgUrl": "http://localhost:3000/id_do_post.png",
    "alt": "Texto alternativo"
  }
  ```