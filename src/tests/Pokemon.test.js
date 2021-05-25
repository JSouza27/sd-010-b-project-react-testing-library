import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Requirement 6', () => {
  const idName = 'pokemon-name';
  const idType = 'pokemon-type';
  const idWeight = 'pokemon-weight';

  it('Verify pokemon card and attributes', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokeName = getByTestId(idName).textContent;
    const pokeType = getByTestId(idType).textContent;
    const pokeWeight = getByTestId(idWeight).textContent;

    expect(pokeName).toBe('Pikachu');
    expect(pokeType).toBe('Electric');
    expect(pokeWeight).toBe('Average weight: 6.0 kg');

    const pokeImage = getByAltText('Pikachu sprite');
    expect(pokeImage).toBeInTheDocument();

    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokeImage).toHaveAttribute('src', src);
  });

  it('Test redirect link to details', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();

    fireEvent.click(detailsLink);
    const detailsPage = getByText(/details/i);
    expect(detailsPage).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('verify icon favorite', () => {
    const { getByRole, getByAltText, getByText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /More details/i });
    fireEvent.click(detailsLink);

    const toFavorite = getByText(/Pokémon favoritado/);
    expect(toFavorite).toBeInTheDocument();
    fireEvent.click(toFavorite);

    const icon = getByAltText('Pikachu is marked as favorite');
    expect(icon).toBeInTheDocument();

    const src = '/star-icon.svg';
    expect(icon).toHaveAttribute('src', src);
  });
});
