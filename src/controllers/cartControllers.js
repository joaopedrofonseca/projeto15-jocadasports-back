import db from "../config/database.js";
import { ObjectId } from 'mongodb';

export async function adicionarAoCarrinho(req, res) {
    const itemId = req.body

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    const usuarioLogado = await db.collection("sessões").findOne({ token })

    if (!usuarioLogado) {
        return res.sendStatus(401)
    }

    const user = await db.collection("usuarios").findOne({
        _id: usuarioLogado.idUser
    })

    if (!user) {
        return res.sendStatus(401)
    }

    const produto = await db.collection("produtos").findOne({ _id: ObjectId(itemId.id) })

    try {
        await db.collection("carrinho").insertOne({
            prodId: produto._id,
            nome: produto.nome,
            imagem: produto.imagem,
            valor: produto.valor,
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