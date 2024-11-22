import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Cria uma constante 'conexao' e atribui a ela o resultado da chamada à função 'conectarAoBanco'. 
// A string de conexão é obtida da variável de ambiente 'STRING_CONEXAO'. A palavra-chave 'await' é utilizada para aguardar a conclusão da função assíncrona.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Define uma função assíncrona 'getTodosPosts' que retorna todos os posts de um banco de dados.
export async function getTodosPosts(){
    // Obtém o banco de dados 'instabytes' a partir da conexão estabelecida.
    const db = conexao.db('instabytes');
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection('posts');
    // Executa uma consulta para encontrar todos os documentos na coleção (posts) e retorna os resultados como um array.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    // Obtém o banco de dados 'instabytes' a partir da conexão estabelecida.
    const db = conexao.db('instabytes');
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection('posts');
    // Executa uma inserção na coleção (posts) e retorna um json com a resposta do BD.
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    // Obtém o banco de dados 'instabytes' a partir da conexão estabelecida.
    const db = conexao.db('instabytes');
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection('posts');

    // Transforma o parametro id do tipo String em um objeto id utilizado pelo MongoDB
    const objId = ObjectId.createFromHexString(id);

    // Executa um update na coleção (posts), utiliza o _id que é um ObjectId do MongoDB para localizar o objeto que queremos alterar e enviamos os novos dados
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set: post});
}