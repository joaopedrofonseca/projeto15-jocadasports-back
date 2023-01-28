import db from "../config/database.js";

export async function adicionarAoCarrinho(req, res) {
    const itemId = req.body

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    try {
        await db.collection("carrinho").insertOne({
            itemId: itemId,
            token: token
        })
        res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function listarCarrinho (req, res) {
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    try{
        const listaDoCarrinho = await db.collection("carrinho").find({token: token}).toArray()
        res.send(listaDoCarrinho)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}