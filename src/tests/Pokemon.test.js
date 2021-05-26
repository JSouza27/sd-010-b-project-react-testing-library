import React from 'react';
import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('testa o requisito 6', () => {
  it('verifica se é renderizado um card com as info do pkmn ', () => {
    RenderWithRouter(<App />);
    const pkmnName = screen.getByTestId('pokemon-name');
    const pkmnType = screen.getByTestId('pokemon-type');
    const pkmnWeight = screen.getByTestId('pokemon-weight');
    expect(pkmnName).toBeInTheDocument();
    expect(pkmnName.textContent).toBe('Pikachu');

    expect(pkmnType).toBeInTheDocument();
    expect(pkmnType.textContent).toBe('Electric');
    
    expect(pkmnWeight).toBeInTheDocument();
    expect(pkmnWeight.textContent).toBe('Average weight: 6.0 kg');

    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(img).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('testa o link more details', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(moreDetails);
    
    const pkmnDetails = screen.getByText(/pikachu details/i)
    expect(pkmnDetails).toBeInTheDocument();

    const favCheckBox = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    expect(favCheckBox).toBeInTheDocument();
    userEvent.click(favCheckBox);

    const favIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});