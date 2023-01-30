import { Router } from "express"
import { finalizarPedido } from "../controllers/checkoutControllers.js"
import schemaCartaoValido from "../middlewares/schemaValido.js"
import { cartaoSchema } from "../schemas/authSchema.js"

const checkoutRouter = Router()

checkoutRouter.post("/checkout", schemaCartaoValido(cartaoSchema), finalizarPedido)

export default checkoutRouter