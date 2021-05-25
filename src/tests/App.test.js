import React from 'react';
import userEvent from '@testing-library/user-event';
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

  it('Should redirect to "/" when click in "Home" link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const homeLink = getByRole('link', {
      name: 'Home',
    });

    userEvent.click(homeLink);

    const atualURL = history.location.pathname;

    expect(atualURL).toBe('/');
  });

  it('Should redirect to "/about" when click in "About" link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const aboutLink = getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutLink);

    const atualURL = history.location.pathname;

    expect(atualURL).toBe('/about');
  });

  it('Should redirect to "/favorites" when click in "Favorite Pokémons', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const favoriteLink = getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(favoriteLink);

    const atualURL = history.location.pathname;

    expect(atualURL).toBe('/favorites');
  });

  it('Should redirect to notFoundPage when goes to strange pages', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/strangepage');

    const notFoundText = getByRole('heading', {
      level: 2,
    });

    expect(notFoundText).toHaveTextContent('Page requested not found 😭');
  });
});
