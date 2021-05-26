import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';
import Pokedex from '../components/Pokedex';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons.', async () => {
    renderWithRouter(<App />);

    const headingH2 = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(headingH2).toBeInTheDocument();
  });

  test('Teste se após clicar no botão próximo, o pokemon é exibido em tela.', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);

    const queryImage = screen.getByRole('img', { name: /charmander sprite/i });
    expect(queryImage).toBeInTheDocument();
  });
});
