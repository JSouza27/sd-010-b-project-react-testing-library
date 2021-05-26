import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Routes', () => {
  test('renders a reading with the text `Pokédex` and link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();

    history.push('/');

    const textHome = getByText('Home');

    expect(textHome).toBeInTheDocument();
  });
  it('renders a reading with the link About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/About');

    const textHome = getByText('About');

    expect(textHome).toBeInTheDocument();
  });
  it('renders a reading with the text `Favorite Pokémons`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/About');

    const textHome = getByText('Favorite Pokémons');

    expect(textHome).toBeInTheDocument();
  });
});
