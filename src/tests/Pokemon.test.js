import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Exercicio 5', () => {
  it('Renderize as informações do Pokemon`', () => {
    const { getByText, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    expect(getByText(/More details/i)).toBeInTheDocument();
    expect(getByText((_, { src }) => src === image)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`)).toBeInTheDocument();
  });

  it('Verifica se ao clicar no link More Details é redirecionado', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const { id } = pokemons[0];
    fireEvent.click(getByText(/More details/i));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se o pokemon é favoritado', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const img = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });

  it('Verifica se o pokemon não é favoritado', () => {
    const { queryByText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    expect(queryByText(`${pokemons[0].name} is marked as favorite`)).toBeNull();
  });
});
