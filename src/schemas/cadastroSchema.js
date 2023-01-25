import Joi from "joi"

const cadastroSchema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    confirmarSenha: Joi.string().valid(Joi.ref("senha")).required(),
    endereço: Joi.string().required()
})


export default cadastroSchema