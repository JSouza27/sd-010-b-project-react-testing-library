import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

const moreDetails = 'More details';

test('Testa se informações detalhadas aparecem na tela', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const linkDetails = getByText(moreDetails);
  userEvent.click(linkDetails);
  const pokeDetails = getByText('Pikachu Details');
  expect(pokeDetails).toBeInTheDocument();
  expect(linkDetails).not.toBeInTheDocument();
  const heading = getByRole('heading', {
    level: 2,
    name: /Summary/i,
  });
  expect(heading).toBeInTheDocument();
  const infoText = getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(infoText).toBeInTheDocument();
});
