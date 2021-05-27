import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';

const [
  pikachu, charmander, caterpie, ekans, alakazam, mew, rapidash, snorlax, dragonair,
] = pokemons;

const isFavoritePokemons = {
  [pikachu.id]: false,
  [charmander.id]: false,
  [caterpie.id]: false,
  [ekans.id]: false,
  [alakazam.id]: false,
  [mew.id]: false,
  [rapidash.id]: false,
  [snorlax.id]: false,
  [dragonair.id]: false,
};

const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  it('', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const heading = getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });
});

describe(`Teste se é exibido o próximo Pokémon da lista
quando o botão Próximo pokémon é clicado.`, () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const btnNextPokemon = getByRole('button', { name: /^próximo pokémon$/i });
    expect(btnNextPokemon).toBeInTheDocument();
  });

  it(`Os próximos Pokémons da lista devem ser mostrados, um a um,
ao clicar sucessivamente no botão`, () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const btnNextPokemon = getByRole('button', { name: /^próximo pokémon$/i });

    for (let index = 1; index < pokemons.length; index += 1) {
      userEvent.click(btnNextPokemon);

      const pokemonName = getByTestId(/^pokemon-name$/);
      const moreDetails = getByRole('link', { name: /^more details$/i });
      expect(pokemonName).toHaveTextContent(pokemons[index].name);
      expect(moreDetails).toBeInTheDocument();
    }
  });

  it(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
se estiver no último Pokémon da lista`, () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const btnNextPokemon = getByRole('button', { name: /^próximo pokémon$/i });

    for (let index = 0; index < pokemons.length; index += 1) {
      userEvent.click(btnNextPokemon);
    }

    const firstIndex = 0;

    const firstPokemonName = getByTestId(/^pokemon-name$/);
    const moreDetails = getByRole('link', { name: /^more details$/i });
    expect(firstPokemonName).toHaveTextContent(pokemons[firstIndex].name);
    expect(moreDetails).toBeInTheDocument();
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  it('', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const pokemonName = getAllByTestId(/^pokemon-name$/);
    expect(pokemonName).toHaveLength(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it(`A partir da seleção de um botão de tipo, a Pokédex deve circular 
somente pelos pokémons daquele tipo`, () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const btnNextPokemon = getByRole('button', { name: /^próximo pokémon$/i });

    const btnFilterFire = getByRole('button', { name: 'Fire' });
    userEvent.click(btnFilterFire);

    const firePokemons = [charmander, rapidash];
    firePokemons.forEach((pokemon) => {
      const pokemonName = getByTestId(/^pokemon-name$/);
      const moreDetails = getByRole('link', { name: /^more details$/i });
      expect(pokemonName).toHaveTextContent(pokemon.name);
      expect(moreDetails).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
    });

    const firstFirePokemonName = getByTestId(/^pokemon-name$/);
    expect(firstFirePokemonName).toHaveTextContent(firePokemons[0].name);
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );

    const randomType = alakazam.type;
    const typeButton = getByRole('button', { name: randomType });
    expect(typeButton).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const btnFilterAll = getByRole('button', { name: 'All' });
    expect(btnFilterAll).toBeInTheDocument();
  });

  it(`A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) 
quando o botão All for clicado`, () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const btnFilterAll = getByRole('button', { name: 'All' });
    const btnNextPokemon = getByRole('button', { name: /^Próximo pokémon$/ });

    const btnFilterElectric = getByRole('button', { name: 'Electric' });
    userEvent.click(btnFilterElectric);

    const pokemonName = getByTestId(/^pokemon-name$/);
    const moreDetails = getByRole('link', { name: /^more details$/i });
    expect(pokemonName).toHaveTextContent(pikachu.name);
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(btnFilterAll);
    for (let index = 0; index < pokemons.length; index += 1) {
      expect(getByTestId(/^pokemon-name$/)).toHaveTextContent(pokemons[index].name);

      userEvent.click(btnNextPokemon);
    }
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const btnNextPokemon = getByRole('button', { name: /^Próximo pokémon$/ });

    for (let index = 0; index < pokemons.length; index += 1) {
      const pokemonName = getByTestId(/^pokemon-name$/);
      const moreDetails = getByRole('link', { name: /^more details$/i });
      expect(pokemonName).toHaveTextContent(pokemons[index].name);
      expect(moreDetails).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
    }
  });
});

describe(`Teste se é criado, dinamicamente,
um botão de filtro para cada tipo de Pokémon.`, () => {
  it('Os botões de filtragem devem ser dinâmicos', () => {
    const firePokemons = pokemons.filter(({ type }) => type === 'Fire');
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ firePokemons }
        isPokemonFavoriteById={ {
          [charmander.id]: false,
          [rapidash.id]: false,
        } }
      />,
    );
    const button = getAllByTestId('pokemon-type-button');
    expect(button).toHaveLength(1);
  });

  it(`Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, 
sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo 
Fire, Psychic, Electric, Bug, Poison, Dragon e Normal`, () => {
    const { getAllByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    types.forEach((type) => {
      const typeButton = getAllByRole('button', { name: type });
      expect(typeButton.length).not.toBeGreaterThan(2);
    });
  });

  it(`Deve ser mostrado como opção de filtro, um botão para cada um dos tipos.
Além disso, o botão All precisa estar sempre visível.`, () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    types.forEach((type) => {
      const typeButton = getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();
    });

    const btnFilterAll = getByRole('button', { name: 'All' });
    expect(btnFilterAll).toBeInTheDocument();
  });
});

describe(`O botão de Próximo pokémon deve ser desabilitado
quando a lista filtrada de Pokémons tiver um só pokémon.`, () => {
  it('', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
    );
    const btnFilterBug = getByRole('button', { name: 'Bug' });
    userEvent.click(btnFilterBug);

    const btnNextPokemon = getByRole('button', { name: /^próximo pokémon$/i });
    expect(btnNextPokemon).toHaveAttribute('disabled');
  });
});
