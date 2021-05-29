import React from 'react';
import userEvent from '@testing-library/user-event';
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

  test('Verifica se o segundo texto possui o texto about', () => {
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

  test('Verifica se o terceiro texto possui o texto favorite pokemons', () => {
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

  test('Verifica se a aplicação é redirecionada para a página de home', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(linkHome);

    const textoH1Home = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(textoH1Home).toBeInTheDocument();
  });

  test('Verifica se a aplicação é redirecionada para a página de about', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(linkAbout);

    const textoH1About = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(textoH1About).toBeInTheDocument();
  });
  
  test('Verifica se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(linkFavorite);

    const textoH1About = screen.getByRole('heading', {
      level: 1,
      name: 'Pokédex',
    });
    expect(textoH1About).toBeInTheDocument();
  });
});
