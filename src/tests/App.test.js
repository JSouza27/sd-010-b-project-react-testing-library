import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouters';
import App from '../App';

describe('Testa requisito 1 App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is "/" ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/';
    history.push(route);

    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Renderiza o segundo link com texto About ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/';
    history.push(route);

    const about = getByText('About');
    expect(about).toBeInTheDocument();
  });

  test('Renderiza o terceiro link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/';
    history.push(route);

    const favorite = getByText('Favorite Pokémons');
    expect(favorite).toBeInTheDocument();
  });

  test('Testa se primeiro link redireciona para "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText('Home');
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se primeiro link redireciona para "About"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText('About');
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });
});
