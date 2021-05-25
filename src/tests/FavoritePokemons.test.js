import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Requisito 3', () => {
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
