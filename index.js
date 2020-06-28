const express = require("express"); //importando o express
const app = express(); 
const bodyParser = require("body-parser");
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta")

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

//Dizendo para o Express que a View Engine é o EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw: true, order: [
        ['id','DESC'] //ASC = CRESCENTE DESC = DECRESCENTE
    ]}).then(pergunta => {
        res.render("index", {
            pergunta: pergunta
        });
    });
});

app.get("/perguntar", (req, res) => {

    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then(perguntas => {
        if(perguntas != undefined) { //pergunta foi encontrada
            Resposta.findAll({
                where: {perguntaId: perguntas.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    perguntas: perguntas,
                    respostas: respostas
                });
            });         
        } else { //não encontrada 
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(8080, () => {

    console.log("app rodando");
});