import con from "./connection.js";


export async function inserirPrograma(programa) {
    let comando = `
    INSERT INTO tb_canal_programa (
        id_canal, nm_programa,ds_genero,hr_programa
    )
    VALUES (?,?,?,?)
`
    let resposta = await con.query(comando, [programa.idCanal, programa.nome, programa.genero, programa.hora])
    let info = resposta[0]

    return info.insertId

}

export async function consultarPrograma() {
    let comando = `
    SELECT p.id_canal_programa, p.id_canal, c.nm_canal, p.nm_programa, p.ds_genero, p.hr_programa
        FROM tb_canal c
        LEFT JOIN tb_canal_programa p
        ON c.id_canal = p.id_canal;
    `
    let resposta = await con.query(comando)
    let info = resposta[0]

    return info
}

export async function alterarPrograma(programa, id) {
    let comando = `
    UPDATE tb_canal_programa
    SET id_canal = ?,
        nm_programa = ?,
        ds_genero =?,
        hr_programa = ?
        WHERE  id_canal_programa = ?
    `
    let resposta = await con.query(comando, [programa.idCanal, programa.nome, programa.genero, programa.hora, id])
    let info = resposta[0]

    return info.affectedRows
}


export async function deletarPrograma(id) {
    let comando = `
    DELETE FROM tb_canal_programa
    WHERE id_canal_programa = ?
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]

    return info.affectedRows 


}