import './index.scss'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Favoritos () {
    const [idusuario, setIdusuario] = useState(0)
    const [idprograma, setIdprograma] = useState(0)
    const [avaliacao, setAvaliacao] = useState(0)
    const [programas, setProgramas] = useState([])
    const [editandoId, setEditandoId] = useState(null);

    async function salvar() {
        const corpo = {
            "idUsuario": idusuario,
            "idPrograma": idprograma,
            "avaliacao": avaliacao
        };
        const url = 'http://localhost:5000/favorito';
        await axios.post(url, corpo);
        setIdusuario(0)
        setIdprograma(0)
        setAvaliacao(0)
    }

    async function buscar() {
        const url = "http://localhost:5000/favoritos";
        let resp = await axios.get(url);
        setProgramas(resp.data);
    }

    function mudarDados(programa) {
        setIdusuario(programa.idUsuario)
        setIdprograma(programa.idPrograma)
        setAvaliacao(programa.avaliacao)
        setEditandoId(programa.id)
    }

    async function salvarAlteracoes() {
        if (editandoId !== null) {
            const url = `http://localhost:5000/favorito/${editandoId}`;
            const corpo = {
                "idUsuario": idusuario,
                "idPrograma": idprograma,
                "avaliacao": avaliacao
            };
            await axios.put(url, corpo);
            buscar();
            setEditandoId(null);
            setIdusuario(0)
            setIdprograma(0)
            setAvaliacao(0)
        }
    }

    async function remover(id) {
        const url = `http://localhost:5000/favorito/${id}`;
        await axios.delete(url);
        await buscar();
    }

    return (
        <div className='pagina-programasfavoritos'>
            <div className='cadastro'>
                <h2><Link to="/" className='link'>Voltar</Link></h2>
                <h2>  {editandoId ? "Editar programa favorito" : "Cadastrar programa favorito"}</h2>

                <div className='form'>
                    <div>
                        <label>Id do uduario:</label>
                        <input type='number' value={idusuario} onChange={e => setIdusuario(parseInt(e.target.value))} />
                    </div>

                    <div>
                        <label>Id do programa:</label>
                        <input type='number' value={idprograma} onChange={e => setIdprograma(parseInt(e.target.value))} />
                    </div>

                    <div>
                        <label>Avaliação:</label>
                        <input type='number' value={avaliacao} onChange={e => setAvaliacao(parseInt(e.target.value))} />
                    </div>
                </div>

                {editandoId ? (
                    <div>
                        <button onClick={salvarAlteracoes}>Salvar Alterações</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={salvar}>Salvar</button>
                    </div>
                )}

                <div>
                    <button onClick={buscar}>Consultar</button>
                </div>
            </div>

            <div className='consultar'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID do usuário</th>
                            <th>Nome do usuário</th>
                            <th>Id do programa</th>
                            <th>Nome do programa</th>
                            <th>Avaliação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programas.map(item => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.idUsuario}</td> 
                                <td>{item.nomeUsuario}</td>
                                <td>{item.idPrograma}</td>
                                <td>{item.nomePrograma}</td>
                                <td>{item.avaliacao}</td>
                                <td>  
                                    <img
                                        src='./edit.png'
                                        alt="Editar"
                                        onClick={() => mudarDados(item)}
                                    />
                                    <img
                                        src='./remover.png'
                                        alt="Remover"
                                        onClick={() => remover(item.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}