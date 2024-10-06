import * as bd from '../repository/canalProgramaRepository.js';
import {Router} from 'express';

const endpoints = Router()

endpoints.post ('/programa', async (req,resp) =>{
    try {
        let programa = req.body
        let id = await bd.inserirPrograma(programa)
        resp.send ({
            novoId : id
        })

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
} )

endpoints.get('/programas', async (req, resp) => {
    try {
        let resposta = await bd.consultarPrograma()
        resp.send(resposta)
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })       
    }
})

endpoints.put('/programa/:id', async (req,resp) =>{
    try {
         let programa = req.body
         let id = req.params.id
         let resposta = await bd.alterarPrograma(programa , id)

         if(resposta >= 1){
            resp.send ({
                mensagem: "programa alterado"
            })
         }
         else{
            resp.send({
                mensagem:" programa não encontrado"
            })
         }
    } 
    catch (err) {
    resp.status(400).send({
        erro: err.message
    })    
    }
})


endpoints.delete('/programa/:id', async (req,resp) =>{
    try {
     let id = req.params.id
     let resposta = await bd.deletarPrograma(id) 
     if(resposta >= 1){
        resp.send({
            mensagem: "programa deletado"
        })
     }

     else{
        resp.send({
            mensagem: "programa não deletado"
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