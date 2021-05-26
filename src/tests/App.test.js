import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithMemoryRouter from './renderWithMemoryRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithMemoryRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Requisito 1', () => {
  it('renderiza pagina pricipal da Pokedex com a url `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('testa se topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithMemoryRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémon/i)).toBeInTheDocument();
  });
});
