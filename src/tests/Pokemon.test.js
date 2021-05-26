import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

const linkPikachu = '/pokemons/25';

describe('Teste o componente <Pokemon.js />', () => {
  test('Um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).not.toHaveAttribute('src', '');
  });

  test('Um link de navegação para exibir detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText('More details');
    expect(details).toHaveAttribute('href', linkPikachu);

    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe(linkPikachu);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);

    history.push(linkPikachu);
    const favorite = getByText('Pokémon favoritado?');
    userEvent.click(favorite);

    const star = getAllByRole('img');
    expect(star[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(star[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
