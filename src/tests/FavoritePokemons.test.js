import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite', () => {
    const { history } = RenderWithRouter(<App />);
  });
});
