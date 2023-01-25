import { MongoClient, MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const MongoClient = new MongoClient(process.env.DATABASE_URL)
let db

try{
    await MongoClient.connect()
    db = mongoClient.db()
} catch(err){
    console.log("Erro ao conectar servidor com Banco de Dados")
}

export default db