import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('test Pokedex component', () => {
  const proxPokemonTexto = 'Próximo pokémon';
  test('heading h2 existence', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Encountered pokémons');
  });

  test('if shows next pokemon when clicked', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(proxPokemonTexto);
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(proxPokemonTexto);
    const pokemon = getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
    fireEvent.click(button);
    const pokemon2 = getByText('Charmander');
    expect(pokemon2).toBeInTheDocument();
  });

  test('if only one pokemon is shown at time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemons = getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
  });
  // código de https://github.com/tryber/sd-09-project-react-testing-library/pull/98/commits/31b97ee8666fc58245df97494dc2136ff37f55fe

  test('if filter is working', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(proxPokemonTexto);
    const fireButton = getByText('Fire');
    fireEvent.click(fireButton);
    const pokemon1 = getByText('Charmander');
    expect(pokemon1).toBeInTheDocument();
    fireEvent.click(nextButton);
    const pokemon2 = getByText('Rapidash');
    expect(pokemon2).toBeInTheDocument();
  });

  test('if All button filter is working', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText('All');
    fireEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
  });

  test('filter buttons', () => {
    const pokemonsTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const buttonsId = getAllByTestId('pokemon-type-button');
    buttonsId.forEach((type, index) => {
      const button = getByRole('button', { name: pokemonsTypes[index] });
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe(pokemonsTypes[index]);
    });
  });

  test('next pokemon button disabled case', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const eletricButton = getByRole('button', { name: 'Electric' });
    fireEvent.click(eletricButton);
    const disabledButton = getByText('Próximo pokémon');
    expect(disabledButton).toHaveAttribute('disabled'); // https://stackoverflow.com/questions/56593840/check-that-button-is-disabled-in-react-testing-library
  });
});
