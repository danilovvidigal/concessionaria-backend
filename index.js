const express = require('express');
const repository = require('./repository');
const server = express();
server.use(express.json());

server.use((req, res, next) => {
    // Fix cors error
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");
    next();
});

server.get('/carros', async (req, res) => {
    try {
        const listaDeCarros = await repository.findAll();
        return res.json(listaDeCarros);
    } catch(err) {
        return res.status(500).json({error: 'Erro Interno do Servidor'});
    }
}) 

server.post('/carros', async (req, res) => {
    try {
        let carro = req.body;
        repository.insert(carro);
        return res.json('Cadastrado com sucesso.');
    } catch (err) {
        return res.status(500).json({error: 'Erro ao inserir um novo carro'});
    }
})

server.get('/carros/:id', async (req, res) => {
    try {
        const {id} = req.params;
        let carro = await repository.findById(id);
        return res.json(carro);
    } catch (err) {
        return res.status(500).json({error: 'Erro ao buscar um carro por id'});
    }
})

server.delete('/carros/:id', async (req, res) => {
    try{
        const {id} = req.params;
        await repository.deleteById(id);
        return res.send();
    } catch (err) {
        return res.status(500).json({error: 'Erro ao deletar um carro'});
    }
});

server.put('/carros/:id', async (req, res) => {
    try {
        const {id} = req.params;
        let carro = req.body;
        await repository.update(id, carro);
        return res.send();
    } catch (err) {
        return res.status(500).json({error: 'Erro ao atualizar um carro'});
    }
});

server.listen(4001);