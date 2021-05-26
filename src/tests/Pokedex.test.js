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
  });
});
