import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('screem from app', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('iterar os links do nav', () => {
    const { getByText } = renderWithRouter(<App />);

    const Home = getByText('Home');
    expect(Home).toBeInTheDocument();

    const About = getByText('About');
    expect(About).toBeInTheDocument();

    const Favorite = getByText('Favorite Pokémons');
    expect(Favorite).toBeInTheDocument();
  });
});
