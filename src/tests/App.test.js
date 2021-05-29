import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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

describe('Requisito 1', () => {
  test('Verificar se a pagina inicial e renderizada', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const textoEmH1 = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(textoEmH1).toBeInTheDocument();
  });

  test('Verifica se o primeiro texto possui o texto home', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkEmA1 = screen.getByRole('link', {
      name: 'Home',
    });
    expect(linkEmA1).toBeInTheDocument();
  });

  test('Verifica se o primeiro texto possui o texto home', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkEmA2 = screen.getByRole('link', {
      name: 'About',
    });
    expect(linkEmA2).toBeInTheDocument();
  });

  test('Verifica se o primeiro texto possui o texto home', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkEmA3 = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkEmA3).toBeInTheDocument();
  });
});
