import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Chama a função 'getTodosPosts' para obter todos os posts e armazena o resultado em 'posts'.
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e o array de posts no formato JSON.
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    // Armazena o corpo da requisição em uma variável
    const novoPost = req.body;
    // Usa o Try para fazer o tratamento de exceção caso tenha erro no servidor
    try {
        // Chama a função 'criarPost' para inserir o novo post
        const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com status 200 (OK) e o novo post criado.
        res.status(200).json(postCriado);
    } catch (erro) {
        // Imprimi no console a mensagem com o erro informado pelo servidor
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Internal Server Error) e uma mensagem informando que a requisição falhou.
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    }
}

export async function uploadImagem(req, res) {
    // Simula o corpo da requisição e armazena o nome do arquivo que vamos fazer upload em uma variável
    const novoPost = {
        descricao: '',
        imgUrl: req.file.originalname,
        alt: ''
    };
    // Usa o Try para fazer o tratamento de exceção caso tenha erro no servidor
    try {
        // Chama a função 'criarPost' para inserir o novo post
        const postCriado = await criarPost(novoPost);

        // Armazena em uma varável o caminho do arquivo que está sendo inserido
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Troca o nome do arquivo que inserimos para o id do objeto no banco de dados
        fs.renameSync(req.file.path, imagemAtualizada);

        // Envia uma resposta HTTP com status 200 (OK) e o novo post criado.
        res.status(200).json(postCriado);
    } catch (erro) {
        // Imprimi no console a mensagem com o erro informado pelo servidor
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Internal Server Error) e uma mensagem informando que a requisição falhou.
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;
    
    // Usa o Try para fazer o tratamento de exceção caso tenha erro no servidor
    try {

        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        };

        // Chama a função 'criarPost' para inserir o novo post
        const postAtualizado = await atualizarPost(id, post);
        // Envia uma resposta HTTP com status 200 (OK) e o novo post criado.
        res.status(200).json(postAtualizado);
    } catch (erro) {
        // Imprimi no console a mensagem com o erro informado pelo servidor
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Internal Server Error) e uma mensagem informando que a requisição falhou.
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    }
}