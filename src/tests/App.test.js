import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/RenderWithRouter';
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

describe('Verifica links do menu', () => {
  it('Verifica o link Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText('Home');
    expect(linkHome).toBeInTheDocument();
  });

  it('Verifica o link About', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/);
    expect(linkAbout).toBeInTheDocument();
  });

  it('Verifica o link Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkFavoritePok = getByText('Favorite Pokémons');
    expect(linkFavoritePok).toBeInTheDocument();
  });

  it('Verifica a rota Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica a rota About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica a rota favoritos', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica um caminho não existente e a renderização da página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
