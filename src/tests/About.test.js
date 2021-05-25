import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Testes ABOUT', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const linkToAbout = screen.getByRole('link', {
    name: /About/i,
  });
  userEvent.click(linkToAbout);
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(h2).toBeInTheDocument();

  const p1 = screen.getByText(/This application simulates a Pokédex/i);
  expect(p1).toBeInTheDocument();

  const p2 = screen.getByText(/One can filter Pokémons by type,/i);
  expect(p2).toBeInTheDocument();

  const img = screen.getByRole('img');
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
