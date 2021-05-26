import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

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

test('Verifica se os links estão sendo renderizados', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});
// Com ajuda do Margato
describe('Verifica se a URL /about renderizam a pagina about', () => {
  test('Verifica se ao clicar nos links renderisa o conteudo da pagina', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
    expect(getByText(/About Pokédex/)).toBeInTheDocument();
  });

  test('Checa a URL /Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
    expect(getByText(/Favorite pokémons/)).toBeInTheDocument();
  });

  test('Verifica se a URL / renderizam a pagina home', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Verifica se URLs desconhecidas renderisam a pagina Not Found', () => {
  test('Texto Page requested not found encontrado', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const routa = '/outras rotas';
    history.push(routa);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
