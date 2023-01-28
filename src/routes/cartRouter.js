import { Router } from "express"
import { adicionarAoCarrinho } from "../controllers/cartControllers.js"
import { listarCarrinho } from "../controllers/cartControllers.js"

const cartRouter = Router()

cartRouter.post("/carrinho", adicionarAoCarrinho)
cartRouter.get("/carrinho", listarCarrinho)

export default cartRouter