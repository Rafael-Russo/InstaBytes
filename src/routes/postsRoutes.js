import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
    // Habilita o middleware 'express.json()', que permite o parsing de dados JSON enviados nas requisições HTTP.
    app.use(express.json());

    app.use(cors(corsOptions));

    // Define uma rota GET para a URL '/posts'.
    app.get('/posts', listarPosts);

    // Define uma rota POST para a URL '/posts'.
    app.post('/posts', postarNovoPost);

    // Define uma rota POST para a URL '/upload' usando a biblioteca multer esperando receber uma única imagem.
    app.post('/upload', upload.single('imagem'), uploadImagem);

    app.put('/upload/:id', atualizarNovoPost);
}
export default routes;