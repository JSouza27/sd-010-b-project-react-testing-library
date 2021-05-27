import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('renderize um conjunto de links', () => {
  it('Se o primeiro link possui o texto "Home"', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].textContent).toBe('Home');
  });
  it('Verifica se o segundo link possui o texto "About"', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[1].textContent).toBe('About');
  });
  it('Verifica se o terceiro link possui o texto "Favorite Pokémons"', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });
});
