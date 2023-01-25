import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'
import {v4 as uuidv4} from 'uuid'
import db from '../config/database.js'


export async function cadastrar(req, res) {
    const { nome, email, senha, endereço } = req.body
    const hashSenha = bcrypt.hashSync(senha, 10)

    try {
        const emailExiste = await db.collection("usuarios").findOne({ email })
        if (emailExiste) return res.status(409).send("Email inválido!")

        await db.collection("usuarios").insertOne({ nome, email, senha: hashSenha, endereço })
        return res.status(201).send("Cadastro feito com sucesso!")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function login(req, res) {
    const { email, senha } = req.body
    try {
        const usuarioExiste = await db.collection("usuarios").findOne({ email })
        if (!usuarioExiste) return res.status(400).send("Usuário/senha incorretos")

        const senhaCorreta = bcrypt.compareSync(senha, usuarioExiste.senha)
        if (!senhaCorreta) return res.status(400).send("Usuário/senha incorretos")

        const token = uuidv4()
        await db.collection("sessões").deleteMany({idUser: ObjectId(usuarioExiste._id)})
        await db.collection("sessões").insertOne({ idUser: usuarioExiste._id, token, lastStatus: Date.now() })
        return res.status(200).send(token)
    } catch (error) {
        return res.status(500).send(error.message)
    }

}