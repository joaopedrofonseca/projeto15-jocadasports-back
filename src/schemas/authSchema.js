import Joi from "joi"

export const cadastroSchema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    confirmarSenha: Joi.string().valid(Joi.ref("senha")).required(),
    endereço: Joi.string().required()
})


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required()
})