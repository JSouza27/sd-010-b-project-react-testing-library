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

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByRole, getByTestId, getByText } = renderWithRouter(<App />);
    const favoritePokemons = getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();

    const home = getByRole('link', { name: /home/i });
    userEvent.click(home);

    const details = getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const inputCheckbox = getByRole('checkbox');
    userEvent.click(inputCheckbox);
    expect(inputCheckbox).toBeChecked();

    userEvent.click(favoritePokemons);

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
