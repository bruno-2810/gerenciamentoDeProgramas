import con from "./connection.js";

export async function adicionarUsuario(usuario) {
    let comando = `
    INSERT INTO tb_usuario (nm_usuario)
        VALUES (?)
    `
    let resposta = await con.query(comando, [usuario.nome])
    let info = resposta[0]
    return info.insertId
}

export async function consultarUsuarios() {
    let comando = `
    SELECT id_usuario   id,
            nm_usuario  nome
        FROM tb_usuario
    `
    let resposta = await con.query(comando)
    let info = resposta[0]
    return info
}

export async function alterarUsuario(usuario, id) {
    let comando = `
    UPDATE tb_usuario
        SET nm_usuario = ?
        WHERE id_usuario = ?
    `
    let resposta = await con.query(comando, [usuario.nome, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function deletarUsuario (id) {
    let comando = `
    DELETE FROM tb_usuario
        WHERE id_usuario = ?
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}