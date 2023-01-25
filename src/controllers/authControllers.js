import db from '../config/database.js'
import cadastroSchema from "../schemas/cadastroSchema.js"

export async function cadastrar(req, res) {
    const { nome, email, senha, confirmarSenha, endereço } = req.body

    try {
        const emailExiste = await db.collection("usuarios").findOne({ email })
        if (emailExiste) return res.status(409).send("Email inválido!")

        await db.collection("usuarios").insertOne({ nome, email, senha, endereço })
        return res.status(201).send("Cadastro feito com sucesso!")
    } catch (err) {
        res.status(500).send(err.message)
    }
}