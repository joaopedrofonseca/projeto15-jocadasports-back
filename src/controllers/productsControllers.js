import db from '../config/database.js'

export async function listarProdutos (req, res) {
    try {
        const produtos = await db.collection("produtos").find({}).toArray()
        return res.send(produtos)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}