import express from 'express'
import cors from 'cors'
import sql from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/Nome/:especie/:habitat/:tamanho/:familia', async (req, res)=>{
    const { nome, especie, habitat, tamanho, grupo} = req.params

    const consulta = await sql`select * from postagemfauna.js where
    Nome = ${nome}, Especie = ${especie}, habitat = ${habitat}, tamanho = ${tamanho} and grupo = ${grupo}`

    if(consulta != null && consulta != '')
        return res.status(200).json(consulta);
    else
        return res.status(401).json('Algo deu errado, tente novamente!')
});

app.post('/fauna/novo', async (req, res)=>{
    const {nome, especie, habitat, tamanho, grupo} = req.body;
    const insert = await sql `insert into fauna(nome_animal, especie, habitat, tamanho, grupo)
    values (${nome},${especie},${habitat},${tamanho},${grupo})` 
    return res.status(200).json('ok')
});

app.post('/flora/novo', async (req, res)=>{
    const {nome, especie, habitat, tamanho, grupo} = req.body;
    const insert = await sql `insert into flora(nome_arvore, especie, localizacao, altura, grupo)
    values (${nome},${especie},${habitat}, ${tamanho}, ${grupo})` 
    return res.status(200).json('ok')
});

app.post('/hidrografia/novo', async (req, res)=>{
    const {oque, importancia, rios, problemas} = req.body;
    const insert = await sql `INSERT INTO hidrografia(
	oque, importancia, rios, problemas)
	VALUES(${oque},${importancia},${rios}, ${problemas})` 
    return res.status(200).json('ok')
});

app.post('/cadastro/novo', async (req, res)=>{
    try{
    const{nome_usuario,email,senha} = req.body;

    if(senha.length != 8){
        return res.status(400).json('Senha deve ter 8 caracteres')
    }
    const insert = await sql`INSERT INTO cadastro(
        nome_usuario, email, senha)
        VALUES (${nome_usuario}, ${email}, ${senha} )`
    return res.status(200).json('ok')
}
catch(error){
    console.log(error)
    if(error.code == 23505){
        return res.status(409).json('e-mail ja cadastrado')
    }
    return res.status(500).json('Erro ao cadastrar usuario!')
}
})

app.get('/login/:usuario/:senha', async (req, res)=>{
    const { usuario, senha } = req.params
    const consulta = await sql `select * from cadastro where email = ${usuario} and senha = ${senha}`
    
    if(consulta != null && consulta != '')
    return res.status(200).json(consulta);
else
    return res.status(401).json('Usuario ou senha incorretos')
});

app.listen(3000,()=>{
    console.log('Running!!')
});