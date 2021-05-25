import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByAltText } = render(<About />);
  expect(screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  })).toBeInTheDocument();

  const image = getByAltText('Pokédex');
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
