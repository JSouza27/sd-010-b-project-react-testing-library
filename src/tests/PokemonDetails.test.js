import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testes do Componente <PokemonDetails/>', () => {
  test('Teste as informações detalhadas do Pokémon selecionado em Details.', () => {
    RenderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const text = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    // testa se existe o heading com o texto pikachu details.
    expect(text).toBeInTheDocument();
    // testa se o link de more details não esta na tela.
    expect(linkMoreDetails).not.toBeInTheDocument();

    const h2Summary = screen.getByRole('heading', { name: /Summary/i });
    // testa se o h2 com o texto summary esta na tela
    expect(h2Summary).toBeInTheDocument();

    const detailParagraph = screen.getByText(
      /this intelligent pokémon roasts hard berries/i, { exact: false },
    );
    expect(detailParagraph).toBeInTheDocument();
  });
});
