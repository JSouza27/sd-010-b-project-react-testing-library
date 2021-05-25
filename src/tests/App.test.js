import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';
//
test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Verifica os links', () => {
  test('Renderiza os links e testa a rota', () => {
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const home = getByRole('link', {
      name: 'Home',
    });
    const about = getByRole('link', {
      name: 'About',
    });
    const favoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();

    userEvent.click(home);

    let currentRoute = history.location.pathname;
    expect(currentRoute).toBe('/');

    userEvent.click(about);
    currentRoute = history.location.pathname;
    expect(currentRoute).toBe('/about');

    userEvent.click(favoritePokemons);
    currentRoute = history.location.pathname;
    expect(currentRoute).toBe('/favorites');

    /* currentRoute = history.location.pathname;
    expect(currentRoute).toBe('/favorites'); */

    history.push('/naoexiste');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
