const moment = require('moment');
const fs = require('fs');

let dadospet = fs.readFileSync('./dadospet.json');

dadospet = JSON.parse(dadospet);

const petshop = {
  attbancopets: () => {
    // att banco no arquivo json e add
    let petsatt = JSON.stringify(dadospet);
    fs.writeFileSync('dadospet.json', petsatt, 'utf-8'); // escreve o que foi editado no arquivo json
  },

  listarPets: () => {
    let textoListaPets = 'PETSHOP \n';
    dadospet.pets.forEach((pet) => {
      //desestruturação

      let { nome, idade, tipo, raca } = pet;

      textoListaPets += `${nome}, ${idade} anos, ${tipo}, ${raca} \n`;

      //pet.servicos.forEach((servico) => {
      //  let { nome = nomeServico, data } = servico;
      //  textoListaPets += `${nome} - ${data} \n`;
      // });
    });
    return textoListaPets;
  },

  VerificaVacinaPet: (animal) => {
    dadospet.pets.forEach((pet) => {
      let { nome, vacinado } = pet;

      if (animal == nome) {
        if (vacinado == false) {
          vacinado = true;
          console.log(`Pet ${nome} não era vacinado e agora esta vacinado`);
        } else {
          console.log(`Pet ${nome} ja era vacinado`);
        }
      }
    });
  },

  campanhaVacina: () => {
    let cont = 0;

    dadospet.pets = dadospet.pets.map((pet) => {
      if (pet.vacinado == false) {
        pet.vacinado = true;
        cont = cont + 1;
      }
      return pet;
    });
    let PetsVacinados = dadospet.pets.length - cont;

    attbancopets();
    console.log(
      `Dentre todos os ${dadospet.pets.length} pets/pet, ${cont} foram/foi vacinado/s e ${PetsVacinados} ja eram/era vacinados!!!`
    );
  },

  adicionarPets: (...novospets) => {
    novospets.forEach((novopet) => {
      dadospet.pets.push(novopet);
    });

    petshop.attbancopets();
    novospets.forEach((pet) => {
      console.log(`${pet.nome} foi adicionado com sucesso!`);
    });
  },

  atenderCliente: (pet, servico) => {
    //(servico)? servico() : console.log('Apenas visitando'); // if ternario para avançar se n tiver 2 parametro
    //servico(); jeito sem if
    console.log(`Tchau ${pet.nome}, até mais`);
    console.log('serviço concluido!!!!');
  },

  darBanhoPet: (pet) => {
    pet.servicos.push({
      nome: 'banho',
      data: moment().format('DD-MM-YYYY'),
    });

    attbancopets();
    console.log(`Pet ${pet.nome} está de banho tomado`);
  },

  TosarPet: (pet) => {
    pet.servicos.push({
      nome: 'tosa',
      data: moment().format('DD-MM-YYYY'),
    });

    attbancopets();
    console.log(`Pet ${pet.nome} está com cabelinho na régua`);
  },

  ApararUnhasPet: (pet) => {
    pet.servicos.push({
      nome: 'corte de unhas',
      data: moment().format('DD-MM-YYYY'),
    });
  },

  buscarpet: (nomepet) => {
    let petencontrado = dadospet.pets.find((pet) => {
      return pet.nome == nomepet;
    });
    return petencontrado;

    // console.log(
    //    petencontrado
    //      ? petencontrado
    //     : `nenhum pet encontrado com o nome${pet.nome}`
    // );
  },

  filtrarTipoPet: (tipoPet) => {
    let TipopetsEncontrados = dadospet.pets.filter((pet) => {
      return pet.tipo == tipoPet;
    });

    console.log(TipopetsEncontrados);
  },

  clientePremium: (pet) => {
    //desestruturação
    let { nome } = pet;

    let nServicos = pet.servicos.length;

    if (nServicos > 5) {
      console.log(
        `Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`
      );
    } else {
      console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
    }
  },

  contatotutor: (pet) => {
    let { nome, contato, tutor } = pet;

    console.log(`  Tutor: ${tutor}
            Contato: ${contato}
            Pet: ${nome}`);
  },

  filtrarTutor: (nomeTutor) => {
    let petsTutor = dadospet.pets.filter((pet) => {
      return pet.tutor == nomeTutor;
    });
  },
};

module.exports = petshop;
