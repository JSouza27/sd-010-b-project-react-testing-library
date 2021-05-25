import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const route = '/';
  history.push(route);

  const home = getByText('Home');
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('testando o link de navegação Home', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', {
    name: /Home/i,
  });
  userEvent.click(linkHome);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('testando o link de navegação About', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', {
    name: /About/i,
  });
  userEvent.click(linkAbout);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('testando o link de navegação Favorite Pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkFavorite = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(linkFavorite);
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('testando se a pagina não for encontrada', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/ll');
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
