import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';

import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Testa pokemon', () => {
  test('Testa informações do Pokemon`', () => {
    const { getByText, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);
    const { name, type, averageWeight: { value, measurementUnit }, image } = data[0];

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    expect(getByText(/More details/i)).toBeInTheDocument();
    expect(getByText((_, { src }) => src === image)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`)).toBeInTheDocument();
  });

  test('Ao clicar redireciona a pagina', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);
    const { id } = data[0];
    fireEvent.click(getByText(/More details/i));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se é favorito', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite
    />);
    const img = getByAltText(`${data[0].name} is marked as favorite`);
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });

  test('Testa se não é favorito', () => {
    const { queryByText } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ false }
    />);
    expect(queryByText(`${data[0].name} is marked as favorite`)).toBeNull();
  });
});
