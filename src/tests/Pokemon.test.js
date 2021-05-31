import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requirement 06', () => {
  test('Testa informações corretas do pokemon', () => {
    const { getByText, getByAltText, getAllByText } = renderWithRouter(<App />);
    const name = getByText('Pikachu');
    const type = getAllByText('Electric');
    const averageWeight = getByText('Average weight: 6.0 kg');
    const img = getByAltText('Pikachu sprite');

    expect(name).toBeInTheDocument();
    expect(type).toHaveLength(2);
    expect(averageWeight).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
  test('Testa se passa informações do link corretamente ', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/More details/i);
    userEvent.click(link);
    const title = getByText('Summary');
    expect(title).toBeInTheDocument();
  });
  test('Testa se o conteudo da url muda', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/More details/i);
    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });
  test('Testa se existe um ícone de estrela', () => {
    const { getByText, getByAltText, getByRole } = renderWithRouter(<App />);
    const link = getByText(/More details/i);
    userEvent.click(link);
    const favorite = getByText(/Pokémon Favoritado?/i);
    userEvent.click(favorite);
    const favoriteimg = getByAltText(/is marked as favorite/);

    expect(favoriteimg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(favoriteimg).toHaveAttribute('src', '/star-icon.svg');
  });
});
