import express from "express";
import cors from 'cors';
import 'dotenv/config';
import con from "./repository/connection.js";
import adicionarRotas from "./rotas.js";

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

adicionarRotas(servidor);

servidor.listen(process.env.PORTA, () => console.log(`--> API rodando <--`));