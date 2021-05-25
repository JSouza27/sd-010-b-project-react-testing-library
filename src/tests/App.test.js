import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testando tela App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verifica links nav', () => {
    const { getByText } = renderWithRouter(<App />);

    const Home = getByText('Home');
    const About = getByText('About');
    const Favorite = getByText('Favorite Pokémons');
    expect(Home).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(Favorite).toBeInTheDocument();
  });
});
