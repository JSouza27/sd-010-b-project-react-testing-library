import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
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
});
