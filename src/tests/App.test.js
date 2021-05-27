import React from 'react';
import { Router/* , MemoryRouter */ } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste component App', () => {
  test('Verificar se a página inicial é renderizada', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const aboutMeText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(aboutMeText).toBeInTheDocument();

    const home = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(home);
    const homeText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(homeText).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(about);
    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();

    const FavoritePokémons = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(FavoritePokémons);
    const favoriteText = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(favoriteText).toBeInTheDocument();
  });
  test('Testa redireciona página About ao cliccar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('', () => {

  });
  test('', () => {

  });
  test('', () => {

  });
  test('É redirecionada para a página Pokémons Favoritados'
  + 'URL /favorites ao cliclar no link Favorite Pokémons', () => {

  });
  test('É redirecionada página Not Found URL desconhecida', () => {

  });
});

/* test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
}); */
