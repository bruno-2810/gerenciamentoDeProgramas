import './index.scss';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Canais() {
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState(0);
    const [aberto, setAberto] = useState(true);
    const [canais, setCanais] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    async function salvar() {
        const corpo = {
            "nome": nome,
            "numero": numero,
            "aberto": aberto,
        };
        const url = 'http://localhost:5000/canal';
        await axios.post(url, corpo);
        setNome('')
        setNumero(0)
        setAberto(false)
    }

    async function buscar() {
        const url = "http://localhost:5000/canais";
        let resp = await axios.get(url);
        setCanais(resp.data);
    }

    function mudarDados(canal) {
        setNome(canal.nome);
        setNumero(canal.numero);
        setAberto(canal.aberto);
        setEditandoId(canal.id);
    }

    async function salvarAlteracoes() {
        if (editandoId !== null) {
            const url = `http://localhost:5000/canal/${editandoId}`;
            const corpo = {
                "nome": nome,
                "numero": numero,
                "aberto": aberto
            };
            await axios.put(url, corpo);
            await buscar();
            setEditandoId(null);
        }
    }

    async function remover(id) {
        const url = `http://localhost:5000/canal/${id}`;
        await axios.delete(url);
        await buscar();
    }

    return (
        <div className='pagina-canais'>
            <div className='cadastro'>
                <h2><Link to="/" className='link'>Voltar</Link></h2>
                <h2>  {editandoId ? "Editar canal" : "Cadastrar canal"}</h2>

                <div className='form'>
                    <div>
                        <label>Nome:</label>
                        <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
                    </div>

                    <div>
                        <label>Numero do canal:</label>
                        <input type='number' value={numero} onChange={e => setNumero(parseInt(e.target.value) || 0)} />
                    </div>

                    <div>
                        <label>Canal aberto?</label>
                        <input type='checkbox' checked={aberto} onChange={e => setAberto(e.target.checked)} />
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
                            <th>Numero</th>
                            <th>Aberto?</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {canais.map(item => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.numero}</td>
                                <td>{item.aberto ? "Sim" : "Não"}</td>
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
