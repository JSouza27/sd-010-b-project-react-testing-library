import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import Pokedex from '../components/Pokedex';

describe('testa requisito 5', () => {
  it('verifica a existência de um heading H2', () => {
    RenderWithRouter(<Pokedex />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
