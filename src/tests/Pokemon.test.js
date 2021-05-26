import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testes do Componente <Pokemon />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    RenderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const imgPkemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPkemon).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(imgPkemon).toHaveAttribute('alt', 'Pikachu sprite');
  });
});
