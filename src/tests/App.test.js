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

describe('Teste de rotas', () => {
  it('Ao clicar em Home redireciona para Home (URL /)', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Ao clicar em About redireciona para About (URL /about)', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/About/i);
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Ao clicar em Favoritos redireciona para a Favorites (URL /favorites)', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Favorite Pokémons/i);
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Ao digitar URL inválida redireciona para Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
