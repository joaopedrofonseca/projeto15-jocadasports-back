import { Router } from "express";
import { cadastrar } from "../controllers/authControllers.js";
import cadastroValido from "../middlewares/cadastroValido.js";
import cadastroSchema from "../schemas/cadastroSchema.js";

const authRouter = Router()

authRouter.post("/cadastro", cadastroValido(cadastroSchema), cadastrar)

export default authRouter