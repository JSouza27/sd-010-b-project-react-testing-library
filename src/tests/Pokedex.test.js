import { fireEvent } from '@testing-library/dom';
import { array } from 'prop-types';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Testa se página contém um h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon quando o botão Próximo é clicado.', () => {
    const { getAllByText, getByText } = renderWithRouter(<App pokemons={ pokemons } />);
    const buttonNext = 'Próximo pokémon';
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      expect(getAllByText('More details').length).toBe(1);
      fireEvent.click(getByText(buttonNext));
    });
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  test('Verifique os pokemons do mesmo tipo`', () => {
    const { getAllByTestId, getByText, getByRole } = renderWithRouter(
      <App pokemons={ pokemons } />,
    );

    const mapPoke = pokemons.map(({ type }) => type);
    const getForId = mapPoke.filter((type, id, arr) => arr.indexOf(type) === id);
    const getValues = (value) => pokemons.filter(({ type }) => type === value);
    const buttonNext = 'Próximo pokémon';

    expect(getAllByTestId('pokemon-type-button').length).toBe(getForId.length);

    getForId.forEach((name) => {
      const buttonName = getByRole('button', { name });
      fireEvent.click(buttonName);
      getValues(name).forEach(({ name: pokemon }) => {
        expect(getByText(pokemon)).toBeInTheDocument();
        fireEvent.click(getByText(buttonNext));
      });
    });

    const getAllValues = getByRole('button', { name: 'All' });
    fireEvent.click(getAllValues);
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(buttonNext));
    });
  });
});
