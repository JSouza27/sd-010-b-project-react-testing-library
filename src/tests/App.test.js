import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing the main page', () => {
  it('renders and check the nav links', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const homeLink = getByRole('link', {
      name: 'Home',
    });
    const aboutLink = getByRole('link', {
      name: 'About',
    });
    const favoriteLink = getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent('Home');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveTextContent('About');

    expect(favoriteLink).toBeInTheDocument();
    expect(favoriteLink).toHaveTextContent('Favorite Pokémons');
  });
});
