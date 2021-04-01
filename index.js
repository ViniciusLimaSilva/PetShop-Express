const express = require('express');
const petshop = require('./petshop');
const app = express();
app.use(express.json());

app.get('/listagem', (request, response) => {
  //const { title, owner } = request.query;

  return response.send(petshop.listarPets());
});

app.get('/pets/:nome', (request, response) => {
  const { nome } = request.params;
  const BuscarPet = petshop.buscarpet(nome);

  if (!BuscarPet) {
    return response.status(404).json({ error: 'PET NÃO ENCONTRADO' });
  }

  return response.json(BuscarPet);
});

app.post('/inserirpet', (request, response) => {
  const {
    nome,
    tipo,
    idade,
    raca,
    peso,
    tutor,
    contato,
    vacinado,
    servicos: [],
  } = request.body;

  const addpet = { nome, tipo, idade, raca, peso, tutor, contato, vacinado };

  petshop.adicionarPets(addpet);

  return response.json(addpet);
});

app.listen(3001, () => {
  console.log('servidor rodando');
});

//console.log(petshop.listarPets());
