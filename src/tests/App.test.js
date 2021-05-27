import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const homeLink = screen.getByRole('link', {
    name: /Home/i,
  });
  expect(homeLink).toBeInTheDocument();

  userEvent.click(homeLink);

  const homeTxt = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(homeTxt).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  expect(aboutLink).toBeInTheDocument();

  userEvent.click(aboutLink);

  const AboutTxt = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(AboutTxt).toBeInTheDocument();

  const favoriteLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  expect(favoriteLink).toBeInTheDocument();

  userEvent.click(favoriteLink);

  const favoriteTxt = screen.getByRole('heading', {
    level: 2,
    name: /Favorite Pokémons/i,
  });
  expect(favoriteTxt).toBeInTheDocument();
});

test('Verifica se a página existe', () => {
  const historyMock = createMemoryHistory();

  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  historyMock.push('/rota-not-found');

  const notFoundTxt = screen.getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });
  expect(notFoundTxt).toBeInTheDocument();
});
