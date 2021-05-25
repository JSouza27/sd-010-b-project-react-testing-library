import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = render(<FavoritePokemons />);
  const paragraph = getByText('No favorite pokemon found');
  expect(paragraph).toBeInTheDocument();
});
