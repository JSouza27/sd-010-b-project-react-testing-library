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
    const { container } = renderWithRouter(<App />);
    const p = container.querySelectorAll('p');
    const quantP = 3;
    expect(p.length).toBe(quantP);
  });
});

describe('Verifica se a Pokédex tem os botões de filtro.', () => {
  test('Ao clicar no botão de tipo, a Pokédex mostra so pokémons daquele tipo.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Psychic/i));
    expect(getByText(/Alakazam/)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Mew/)).toBeInTheDocument();
  });
});

describe('Verifica se a Pokédex contém um botão para resetar o filtro.', () => {
  test('Ao clicar no botão de tipo, a Pokédex mostra so pokémons daquele tipo.', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/All/)).toBeInTheDocument();
  });

  test('Ao clicar no botão de All, a Pokédex mostra todos os pokémons.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/All/i));
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Charmander/)).toBeInTheDocument();
  });

  test('Ao iniciar a pagina, o filtro selecionada deve ser All.', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Charmander/)).toBeInTheDocument();
  });
});

describe('Verifica se a botão de filtro para cada tipo de Pokémon.', () => {
  test('Verifica se a botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId, getAllByRole } = renderWithRouter(<App />);
    const buttonType = getAllByTestId('pokemon-type-button');
    const buttons = getAllByRole('button');
    expect(buttonType.length + 2).toBe(buttons.length);
  });
});

describe('checa se o botão Próximo pokémon desativa quando tiver um só pokémon', () => {
  test('checa se o botão Próximo pokémon desativa quando tiver um só pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Bug/i));
    expect(getByText(/Próximo pokémon/)).toHaveAttribute('disabled');
  });
});

// const button = container.querySelectorAll('button');
// console.log(button.length);
// expect(button.length).toBe
// expect(getByText(/All/)).toBeInTheDocument();
// // expect(getByText(/Electric/)).toBeInTheDocument();
// expect(getByText(/Fire/)).toBeInTheDocument();
// expect(getByText(/Bug/)).toBeInTheDocument();
// expect(getByText(/Poison/)).toBeInTheDocument();
// expect(getByText(/Psychic/)).toBeInTheDocument();
// expect(getByText(/Normal/)).toBeInTheDocument();
// expect(getByText(/Dragon/)).toBeInTheDocument();

// const { getByAltText } = renderWithRouter(<About />);
// const pokedexImage = getByAltText('Pokédex');
// expect(pokedexImage).toHaveAttribute(
//   'src',
//   'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
// );
