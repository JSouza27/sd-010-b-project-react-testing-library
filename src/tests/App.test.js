import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('Testa se a pagina inicial é renderizada com o caminho "/"', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const heading = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(heading).toBeInTheDocument();
});

describe('testa um conjunto de links', () => {
  it('Se primeiro link possui o texto "Home" ', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].textContent).toBe('Home');
  });
  it('Se segundo link possui o texto "About" ', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[1].textContent).toBe('About');
  });
  it('Se terceiro link possui o texto "Favorite Pokémons" ', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });
});

