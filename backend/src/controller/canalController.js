import * as bd from '../repository/canalRepository.js';
import {Router} from 'express';

const endpoints = Router();

endpoints.post('/canal', async (req, resp) => {
    try {
        let canal = req.body
        let id = await bd.inserirCanal(canal)
        resp.send({
            novoId: id
        })
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

endpoints.get('/canais', async (req, resp) => {
    try {
        let resposta = await bd.consultarCanais()
        resp.send(resposta)
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

endpoints.put('/canal/:id', async (req, resp) => {
    try {
        let canal = req.body
        let id = req.params.id
        let resposta = await bd.alterarCanal(canal, id)

        if(resposta >= 1) {
            resp.send({
                mensagem: "canal alterado"
            })
        }
        else{
            resp.send({
                mensagem: "canal não encontrado"
            })
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })        
    }
})

endpoints.delete('/canal/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let resposta = await bd.deletarCanal(id)

        if(resposta >= 1){
            resp.send({
                mensagem: "canal deletado"
            })
        }
        else {
            resp.send({
                mensagem: "canal não encontrado"
            })
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })        
    }
})

export default endpoints;