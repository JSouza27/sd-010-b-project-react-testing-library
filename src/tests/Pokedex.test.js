import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import { render } from '@testing-library/react';

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
      /* const { getByRole, getByTestId } = renderWithRouter(<App />);
      const btnNextPokemon = getByRole('button', { name: 'Próximo pokémon' });
      expect(btnNextPokemon).toBeInTheDocument();
      userEvent.click(btnNextPokemon);

      const nextPokemon = getByTestId('pokemon-name');
      expect(nextPokemon).toHaveTextContent(/^charmander$/i); */
      const [
        pikachu,
        charmander,
        caterpie,
        ekans,
        alakazam,
        mew,
        rapidash,
        snorlax,
        dragonair
      ] = pokemons;

      const {} = render(<Pokedex />);
    });
  });
});
