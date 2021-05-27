import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica o componente Pokédex.', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered pokémons ', () => {
    const { getByRole } = renderWithRouter(<App />);
    const textH2 = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(textH2).toBeInTheDocument();
  });
});

describe('Verifica o botão proximo pokemon.', () => {
  test('Testa se o botão proximo pokemon existe', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Próximo pokémon/)).toBeInTheDocument();
  });

  test('ao clicar sucessivamente no botão, renderiza os pokemons uma a um', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Charmander/)).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Caterpie/)).toBeInTheDocument();
    const numeroDePokemons = 7;
    for (let cont = 0; cont < numeroDePokemons; cont += 1) {
      fireEvent.click(getByText(/Próximo pokémon/i));
    }
    expect(getByText(/Pikachu/)).toBeInTheDocument();
  });

  test('Testa se o botão proximo pokemon existe', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Próximo pokémon/)).toBeInTheDocument();
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {

  });
});

// Teste se a Pokédex tem os botões de filtro.

// A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;

// O texto do botão deve corresponder ao nome do tipo, ex. Psychic;

// Teste se a Pokédex contém um botão para resetar o filtro

// O texto do botão deve ser All;

// A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;

// Ao carregar a página, o filtro selecionado deverá ser All;

// Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.

// Os botões de filtragem devem ser dinâmicos;

// Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric, Bug, Poison, Dragon e Normal;

// Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível.

// O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.

// O que será verificado:

// Será avaliado se o arquivo teste Pokedex.test.js contemplam 100% dos casos de uso criados pelo Stryker.
