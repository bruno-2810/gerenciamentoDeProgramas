import * as bd from '../repository/programaFavoritoRepository.js';
import {Router} from 'express';

const endpoints = Router()

endpoints.post ('/favorito', async (req,resp) =>{
    try {
        let programa = req.body
        let id = await bd.inserirFavorito(programa)
        resp.send ({
            novoId : id
        })

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })    
    }
} )

endpoints.get('/favoritos', async (req, resp) => {
    try {
        let resposta = await bd.consultarFavorito()
        resp.send(resposta)
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })       
    }
})

endpoints.put('/favorito/:id', async (req,resp) =>{
    try {
         let programa = req.body
         let id = req.params.id
         let resposta = await bd.alterarFavorito(programa , id)

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


endpoints.delete('/favorito/:id', async (req,resp) =>{
    try {
     let id = req.params.id
     let resposta = await bd.deletarFavorito(id) 
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