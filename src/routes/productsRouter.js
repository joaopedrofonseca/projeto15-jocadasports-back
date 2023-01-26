import { Router } from "express"
import { listarProdutos } from "../controllers/productsControllers.js"

const productsRouter = Router()

productsRouter.get("/produtos", listarProdutos)

export default productsRouter