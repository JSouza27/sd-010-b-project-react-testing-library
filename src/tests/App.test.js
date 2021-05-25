import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

it('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Verifica o Requisito 1 do projeto', () => {
  it('deve renderizar o componente Home', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const home = getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });

  it('deve renderizar o componente Favorite Pokémons', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favPkmn = getByText(/Favorite pokémons/);
    expect(favPkmn).toBeInTheDocument();
  });

  it('deve renderizar o componente About', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutAll = getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });

  it('verifica endereço não existente', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
