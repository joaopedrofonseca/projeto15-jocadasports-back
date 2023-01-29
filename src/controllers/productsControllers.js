import { ObjectId } from 'mongodb';
import db from '../config/database.js'

export async function listarProdutos (req, res) {
    try {
        const produtos = await db.collection("produtos").find({}).toArray()
        return res.send(produtos)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function detalhesProduto (req, res) {
    const { id } = req.params;

    try {
        const produto = await db.collection("produtos").findOne({ _id: ObjectId(id) })
        res.send(produto)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}