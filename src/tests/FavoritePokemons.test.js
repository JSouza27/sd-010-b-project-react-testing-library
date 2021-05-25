import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Mensagem No favorite pokemon found', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const linkToFavorite = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(linkToFavorite);
  const noFavorite = screen.getByText('No favorite pokemon found');
  expect(noFavorite).toBeInTheDocument();
});
