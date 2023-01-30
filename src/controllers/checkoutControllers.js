import db from "../config/database.js";

export async function finalizarPedido (req, res) {
    const dadosCompra = req.body
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

    try {
        await db.collection("checkout").insertOne({
            produtos: dadosCompra.produtos,
            nomeCartao: dadosCompra.nomeCartao, 
            numeroCartao: dadosCompra.numeroCartao, 
            numeroSegurança: dadosCompra.numeroSegurança, 
            dataValidade: dadosCompra.dataValidade
        })
        res.sendStatus(201)
    } catch {
        return res.status(500).send(error.message)
    }


}