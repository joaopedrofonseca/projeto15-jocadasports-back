import { Router } from "express";
import { cadastrar, login} from "../controllers/authControllers.js";
import schemaValido from "../middlewares/schemaValido.js";
import { cadastroSchema, loginSchema } from "../schemas/authSchema.js";

const authRouter = Router()

authRouter.post("/cadastro", schemaValido(cadastroSchema), cadastrar)
authRouter.post("/login", schemaValido(loginSchema), login)

export default authRouter