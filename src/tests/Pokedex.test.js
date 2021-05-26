import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
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

describe('Testando o componente <Pokedex />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  describe(`Teste se é exibido o próximo Pokémon da lista
quando o botão Próximo pokémon é clicado.`, () => {
    it('O botão deve conter o texto Próximo pokémon', () => {
      // const {} = renderWithRouter(<Pokedex />);
      const { getByRole } = renderWithRouter(<App />);
      const btnNextPokemon = getByRole('button', { name: 'Próximo pokémon' });
      expect(btnNextPokemon).toBeInTheDocument();
    });

    it(`Os próximos Pokémons da lista devem ser mostrados, um a um,
ao clicar sucessivamente no botão`, () => {
      const { getByRole, getByTestId } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
      );
      const btnNextPokemon = getByRole('button', { name: 'Próximo pokémon' });
      expect(btnNextPokemon).toBeInTheDocument();
      for (let index = 1; index < pokemons.length; index += 1) {
        const { value, measurementUnit } = pokemons[index].averageWeight;

        userEvent.click(btnNextPokemon);

        const randomPokemonName = getByTestId('pokemon-name');
        const randomPokemonType = getByTestId('pokemon-type');
        const randomPokemonWeight = getByTestId('pokemon-weight');
        expect(randomPokemonName).toHaveTextContent(pokemons[index].name);
        expect(randomPokemonType).toHaveTextContent(pokemons[index].type);
        expect(randomPokemonWeight)
          .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      }
    });

    it(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
se estiver no último Pokémon da lista`, () => {
      const { getByRole, getByTestId } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
      );
      const btnNextPokemon = getByRole('button', { name: 'Próximo pokémon' });
      expect(btnNextPokemon).toBeInTheDocument();
      for (let index = 0; index < pokemons.length; index += 1) {
        userEvent.click(btnNextPokemon);
      }
      const randomPokemonName = getByTestId('pokemon-name');
      expect(randomPokemonName).toHaveTextContent(/^pikachu$/i);
    });
  });

  describe('Teste se a Pokédex tem os botões de filtro.', () => {
    it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
      const { getByRole } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
      );
      types.forEach((type) => {
        const typeButton = getByRole('button', { name: type });
        expect(typeButton).toBeInTheDocument();
      });
    });

    it(`A partir da seleção de um botão de tipo,
a Pokédex deve circular somente pelos pokémons daquele tipo`, () => {
      const { getByRole, getByTestId } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
      );
      const typeButton = getByRole('button', { name: 'Fire' });
      userEvent.click(typeButton);

      const btnNextPokemon = getByRole('button', { name: 'Próximo pokémon' });
      const firePokemons = pokemons.filter(({ type }) => type === 'Fire');
      for (let index = 0; index < firePokemons.length; index += 1) {
        const { value, measurementUnit } = firePokemons[index].averageWeight;

        const randomPokemonName = getByTestId('pokemon-name');
        const randomPokemonType = getByTestId('pokemon-type');
        const randomPokemonWeight = getByTestId('pokemon-weight');
        expect(randomPokemonName).toHaveTextContent(firePokemons[index].name);
        expect(randomPokemonType).toHaveTextContent(firePokemons[index].type);
        expect(randomPokemonWeight)
          .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

        userEvent.click(btnNextPokemon);
      }

      const randomPokemonName = getByTestId('pokemon-name');
      expect(randomPokemonName).toHaveTextContent(/^charmander$/i);
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
      const btnNextPokemon = getByRole('button', { name: 'Próximo pokémon' });
      const btnFilterAll = getByRole('button', { name: 'All' });

      const btnFilterFire = getByRole('button', { name: 'Fire' });
      userEvent.click(btnFilterFire);
      const firePokemons = pokemons.filter(({ type }) => type === 'Fire');
      firePokemons.forEach((pokemon) => {
        const { value, measurementUnit } = pokemon.averageWeight;

        const randomPokemonName = getByTestId('pokemon-name');
        const randomPokemonType = getByTestId('pokemon-type');
        const randomPokemonWeight = getByTestId('pokemon-weight');
        expect(randomPokemonName).toHaveTextContent(pokemon.name);
        expect(randomPokemonType).toHaveTextContent(pokemon.type);
        expect(randomPokemonWeight)
          .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

        userEvent.click(btnNextPokemon);
      });

      userEvent.click(btnFilterAll);
      pokemons.forEach((pokemon) => {
        const { value, measurementUnit } = pokemon.averageWeight;

        const randomPokemonName = getByTestId('pokemon-name');
        const randomPokemonType = getByTestId('pokemon-type');
        const randomPokemonWeight = getByTestId('pokemon-weight');
        expect(randomPokemonName).toHaveTextContent(pokemon.name);
        expect(randomPokemonType).toHaveTextContent(pokemon.type);
        expect(randomPokemonWeight)
          .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
        userEvent.click(btnNextPokemon);
      });
    });

    it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
      const { getByRole, getByTestId } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoritePokemons } />,
      );
      const btnNextPokemon = getByRole('button', { name: 'Próximo pokémon' });

      pokemons.forEach((pokemon) => {
        const { value, measurementUnit } = pokemon.averageWeight;

        const randomPokemonName = getByTestId('pokemon-name');
        const randomPokemonType = getByTestId('pokemon-type');
        const randomPokemonWeight = getByTestId('pokemon-weight');
        expect(randomPokemonName).toHaveTextContent(pokemon.name);
        expect(randomPokemonType).toHaveTextContent(pokemon.type);
        expect(randomPokemonWeight)
          .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
        userEvent.click(btnNextPokemon);
      });
    });
  });
});
