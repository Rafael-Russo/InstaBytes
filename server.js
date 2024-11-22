import express from 'express';
import routes from './src/routes/postsRoutes.js';

// Cria uma instância do Express e a armazena na variável 'app', que representa a aplicação web.
const app = express();
app.use(express.static('uploads'));
routes(app);

// Inicia o servidor Express na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
    console.log('servidor escutando...');
});