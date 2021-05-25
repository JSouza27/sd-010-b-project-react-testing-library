import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testando o componente <FavoritePokemons />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const favoritePokemons = getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
