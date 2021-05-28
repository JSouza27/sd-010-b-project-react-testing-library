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
  describe('testato o caminho da rota', () => {
    it('verifica ao clicar em  Home deve ser direcionado para (URL/)', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const home = getByText(/Home/i);
      userEvent.click(home);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
    it('verifica ao clicar em  About deve ser direcionado para (URL/about)', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const home = getByText(/About/i);
      userEvent.click(home);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
    it('verifica ao clicar Favoritos deve ser direcionado para Favorites (URL/favorites)',
      () => {
        const { getByText, history } = renderWithRouter(<App />);
        const home = getByText(/Favorite Pokémons/i);
        userEvent.click(home);
        const { pathname } = history.location;
        expect(pathname).toBe('/favorites');
      });
    it('Se digitar URL inválida deve ser direcionado para not Found', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/pagina-que-nao-existe');
      const noMatch = getByText(/page requested not found/i);
      expect(noMatch).toBeInTheDocument();
    });
  });
});
