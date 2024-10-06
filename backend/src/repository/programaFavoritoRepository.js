import con from "./connection.js";

export async function inserirFavorito(programa) {
    let comando = `
    INSERT INTO tb_programa_favorito(id_usuario,id_canal_programa,vl_avaliacao)
    VALUES (?, ?, ?)
    `
    let resposta = await con.query(comando, [programa.idUsuario, programa.idPrograma, programa.avaliacao])
    let info = resposta[0]
    return info.insertId
}

export async function consultarFavorito() {

    let comando = `
    SELECT pf.id_programa_favorito  id,
            u.id_usuario  idUsuario,
            u.nm_usuario    nomeUsuario,
            cp.id_canal_programa    idPrograma,
            cp.nm_programa  nomePrograma,
            pf.vl_avaliacao avaliacao
        FROM 
    tb_canal_programa cp
        LEFT JOIN 
    tb_programa_favorito pf ON cp.id_canal_programa = pf.id_canal_programa
        LEFT JOIN 
    tb_usuario u ON pf.id_usuario = u.id_usuario;
    `
    let resposta = await con.query(comando)
    let info = resposta[0]
    return info
}

export async function alterarFavorito(programa, id) {
    let comando = `
     UPDATE tb_programa_favorito
     SET    id_usuario = ?, 
        id_canal_programa = ?,
        vl_avaliacao = ?
    WHERE id_programa_favorito = ?
     `
    let resposta = await con.query(comando, [programa.idUsuario, programa.idPrograma, programa.avaliacao, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function deletarFavorito(id) {

    let comando = `
    DELETE FROM  tb_programa_favorito
    WHERE id_programa_favorito = ?`

    let resposta = await con.query(comando, [id])
    let info = resposta[0]

    return info.affectedRows
}