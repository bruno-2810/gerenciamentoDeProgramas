import './index.scss'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Usuario () {

    const [nome, setNome] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [editandoId, setEditandoId] = useState(null);

    async function salvar() {
        const corpo = {
            "nome": nome
        };
        const url = 'http://localhost:5000/usuario/';
        await axios.post(url, corpo);
        setNome('')
    }

    async function buscar() {
        const url = "http://localhost:5000/usuarios";
        let resp = await axios.get(url);
        setUsuarios(resp.data);
    }

    function mudarDados(usuario) {
        setNome(usuario.nome)
        setEditandoId(usuario.id)
    }

    async function salvarAlteracoes() {
        if (editandoId !== null) {
            const url = `http://localhost:5000/usuario/${editandoId}`;
            const corpo = {
                "nome": nome
            };
            await axios.put(url, corpo);
            await buscar();
            setEditandoId(null);
            setNome('')
        }
    }

    async function remover(id) {
        const url = `http://localhost:5000/usuario/${id}`;
        await axios.delete(url);
        await buscar();
    }

    return (
        <div className='pagina-usuarios'>
            <div className='cadastro'>
                <h2><Link to="/" className='link'>Voltar</Link></h2>
                <h2>  {editandoId ? "Editar usuario" : "Cadastrar usuario"}</h2>

                <div className='form'>
                    <div>
                        <label>Nome :</label>
                        <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
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
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(item => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.nome}</td> 
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