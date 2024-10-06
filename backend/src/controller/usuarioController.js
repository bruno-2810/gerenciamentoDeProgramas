import * as bd from '../repository/usuarioRepository.js'
import {Router} from 'express'

const endpoints = Router();

endpoints.post('/usuario', async (req, resp) => {
    try {
        let usuario = req.body
        let id = await bd.adicionarUsuario(usuario);
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

endpoints.get('/usuarios', async (req, resp) => {
    try {
        let resposta = await bd.consultarUsuarios();
        resp.send(resposta)
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

endpoints.put('/usuario/:id', async (req, resp) => {
    try {
        let usuario = req.body
        let id = req.params.id
        let resposta = await bd.alterarUsuario(usuario, id)
        
        if(resposta >= 1) {
            resp.send({
                mensagem: "usuario alterado"
            })
        }
        else {
            resp.send({
                mensagem: "usuario não encontrado"
            })
        }
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

endpoints.delete('/usuario/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let resposta = await bd.deletarUsuario(id)
        if(resposta >= 1){
            resp.send({
                mensagem: "usuario deletado"
            })
        }
        else{
            resp.send({
                mensagem: "usuario não encontrado"
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