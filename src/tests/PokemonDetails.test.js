import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const DETAILS = /More details/i;

describe('Exercicio 5', () => {
  it('Renderize dois h2, um com o nome Pokemon, e outro Summary `', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const { name } = pokemons[0];
    fireEvent.click(getByText(DETAILS));
    const headingPokemon = getByRole('heading', { level: 2, name: `${name} Details` });
    expect(headingPokemon).toBeInTheDocument();
    expect(getByRole('heading',
      { level: 2, name: `Game Locations of ${name}` })).toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: /Summary/i })).toBeInTheDocument();
  });

  it('Deve conter 1 páragrafo com as informações do pokemon', () => {
    const { queryByText } = renderWithRouter(<App />);
    fireEvent.click(queryByText(DETAILS));
    const paragraph = queryByText((c, e) => e.tagName === 'P' && c.includes('Pokémon'));
    expect(paragraph).toBeInTheDocument();
  });

  it('Não deve existir o link More Details', () => {
    const { queryByText } = renderWithRouter(<App />);
    fireEvent.click(queryByText(DETAILS));
    expect(queryByText(DETAILS)).toBeNull();
  });

  it('Exiba os mapas da localização do pokemon', () => {
    const { queryByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(queryByText(DETAILS));
    const { foundAt, name } = pokemons[0];

    foundAt.forEach(({ location, map }, index) => {
      expect(queryByText(location));
      const image = getAllByAltText(`${name} location`)[index];
      expect(image).toHaveAttribute('src', map);
    });
  });

  it('Pokemon deve ser favoritado', () => {
    const { getByText,
      getByRole, queryByAltText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(DETAILS));
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(queryByAltText(/marked/)).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(queryByAltText(/marked/)).toBeNull();
  });
});
