import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se renderiza um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const imagePokemon = screen.getByRole('img');
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o link de detalhes é exibido em tela pelo ID;', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText('More details');
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Teste se ao clicar no link de navegação, redireciona para detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const pikachuDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pikachuDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
