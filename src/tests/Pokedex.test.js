import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

test('Teste se página contém um heading com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });

  expect(heading).toBeInTheDocument();
});
