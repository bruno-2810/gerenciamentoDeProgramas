import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './index.scss'

export default function Programa () {
    const [idcanal, setIdcanal] = useState(0)
    const [nome, setNome] = useState('')
    const [genero, setGenero] = useState('')
    const [horario, setHorario] = useState('')
    const [programas, setProgramas] = useState([])
    const [editandoId, setEditandoId] = useState(null);

    async function salvar() {
        const corpo = {
            "idCanal": idcanal,
            "nome": nome,
            "genero": genero,
            "hora": horario
        };
        const url = 'http://localhost:5000/programa';
        await axios.post(url, corpo);
        setIdcanal(0)
        setNome('')
        setGenero('')
        setHorario('')
    }

    async function buscar() {
        const url = "http://localhost:5000/programas";
        let resp = await axios.get(url);
        setProgramas(resp.data);
    }

    function mudarDados(programa) {
        setIdcanal(programa.id_canal)
        setNome(programa.nm_programa)
        setGenero(programa.ds_genero)
        setHorario(programa.hr_programa)
        setEditandoId(programa.id_canal_programa)
    }

    async function salvarAlteracoes() {
        if (editandoId !== null) {
            const url = `http://localhost:5000/programa/${editandoId}`;
            const corpo = {
                "idCanal": idcanal,
                "nome": nome,
                "genero": genero,
                "hora": horario
            };
            await axios.put(url, corpo);
            await buscar();
            setEditandoId(null);
            setIdcanal(0)
            setNome('')
            setGenero('')
            setHorario('')
        }
    }

    async function remover(id_canal_programa) {
        const url = `http://localhost:5000/programa/${id_canal_programa}`;
        await axios.delete(url);
        await buscar();
    }

    return (
        <div className='pagina-programas'>
            <div className='cadastro'>
                <h2><Link to="/" className='link'>Voltar</Link></h2>
                <h2>  {editandoId ? "Editar programa" : "Cadastrar programa"}</h2>

                <div className='form'>
                    <div>
                        <label>Id do canal:</label>
                        <input type='number' value={idcanal} onChange={e => setIdcanal(parseInt(e.target.value))} />
                    </div>

                    <div>
                        <label>Programa:</label>
                        <input type='text' value={nome} onChange={e => setNome(e.target.value)} />
                    </div>

                    <div>
                        <label>Genero:</label>
                        <input type='text' value={genero} onChange={e => setGenero(e.target.value)} />
                    </div>

                    <div>
                        <label>Horário:</label>
                        <input type='time' value={horario} onChange={e => setHorario(e.target.value)} />
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
                            <th>Canal</th>
                            <th>Programa</th>
                            <th>Gênero</th>
                            <th>Horário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programas.map(item => (
                            <tr>
                                <td>{item.id_canal_programa}</td>
                                <td>{item.nm_canal}</td> 
                                <td>{item.nm_programa}</td>
                                <td>{item.ds_genero}</td>
                                <td>{item.hr_programa}</td>
                                <td>  
                                    <img
                                        src='./edit.png'
                                        alt="Editar"
                                        onClick={() => mudarDados(item)}
                                    />
                                    <img
                                        src='./remover.png'
                                        alt="Remover"
                                        onClick={() => remover(item.id_canal_programa)}
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