import { Router } from "express"
import { detalhesProduto, listarProdutos } from "../controllers/productsControllers.js"

const productsRouter = Router()

productsRouter.get("/produtos", listarProdutos)
productsRouter.get("/detalhes/:id", detalhesProduto)

export default productsRouter