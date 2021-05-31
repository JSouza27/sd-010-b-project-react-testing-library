import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRoute from '../helper/renderWithRoute';
import App from '../App';

describe('Request 6', () => {
  const pkmName = 'pokemon-name';
  const pkmType = 'pokemon-type';
  const pkmWeight = 'pokemon-weight';

  it('shows the card with info', () => {
    renderWithRoute(<App />);

    const name = screen.getByTestId(pkmName).textContent;
    const type = screen.getByTestId(pkmType).textContent;
    const weight = screen.getByTestId(pkmWeight).textContent;
    const pkmImg = screen.getByAltText(/pikachu sprite/i);

    expect(name).toBe('Pikachu');
    expect(type).toBe('Electric');
    expect(weight).toBe('Average weight: 6.0 kg');
    expect(pkmImg).toBeInTheDocument();
    expect(pkmImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('contains a details link', () => {
    renderWithRoute(<App />);

    const link = screen.getByText(/more details/i);
    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    const details = screen.getByText('Pikachu Details');
    expect(details).toBeInTheDocument();
  });

  it('contains a star icon in favorite pokemons', () => {
    renderWithRoute(<App />);

    const link = screen.getByText(/more details/i);
    fireEvent.click(link);

    const favorite = screen.getByText(/pokémon favoritado/i);
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);

    const star = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
