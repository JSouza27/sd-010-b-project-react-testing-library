import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Test the <App /> component', () => {
  it('renders a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);

    expect(heading).toBeInTheDocument();
  });

  it('renders a navigatrion bar with Home, About and Favorites Pokémons links', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorites = getByText('Favorite Pokémons');

    expect(home).toHaveTextContent('Home');
    expect(about).toHaveTextContent('About');
    expect(favorites).toHaveTextContent('Favorite Pokémons');
  });

  it('redirects properly for each route (Home, About and Favorite)', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorites = getByText(/Favorite Pokémons/i);

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('redirects the page when an invalid url is typed', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/digimon-is-better'); // obviously no

    expect(history.location.pathname).toBe('/digimon-is-better');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
