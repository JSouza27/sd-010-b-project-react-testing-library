import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

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

    history.push('/favorites');

    const textHome = getByText('Favorite Pokémons');
    expect(textHome).toBeInTheDocument();
  });
  it('tests if founds "Not Found" when going to a unknow path',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      history.push('/not-existing-page');

      const notFound = getByText(/not found/i);
      expect(notFound).toBeInTheDocument();
    });
});
