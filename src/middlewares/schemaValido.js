export default function schemaValido(schema){
    return (req,res,next) => {
        const {error} = schema.validate(req.body, {abortEarly: false})
        if (error){
            const errorMessages = error.details.map(err => err.message)
            return res.status(422).send(errorMessages)    
        }
        next()
    }
}

export function schemaCartaoValido(schema){
    return (req,res,next) => {
        const dadosCartao = req.body
        const cartao = {nomeCartao: dadosCartao.nomeCartao, numeroCartao: dadosCartao.numeroCartao, numeroSegurança: dadosCartao.numeroSegurança, dataValidade: dadosCartao.dataValidade}
        const {error} = schema.validate(cartao, {abortEarly: false})
        if (error){
            const errorMessages = error.details.map(err => err.message)
            return res.status(422).send(errorMessages)    
        }
        next()
    }
}