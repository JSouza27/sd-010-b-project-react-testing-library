import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testes do Componente <PkemonDetails/>', () => {
  test('Teste as informações detalhadas do Pokémon selecionado.', () => {
    RenderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const text = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(text).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();
  });
});
