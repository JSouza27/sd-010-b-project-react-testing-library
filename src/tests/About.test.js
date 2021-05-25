import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testing App', () => {
  test('shows the Pokédex when the route is `/about`', () => {
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutText).toBeInTheDocument();
  });

  test('verificar se existe um primeiro parágrafo na página "About"', () => {
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );

    const firstParagraph = screen.getByText('all Pokémons', {
      exact: false,
    });

    expect(firstParagraph).toBeInTheDocument();
  });

  test('verificar se existe um segundo parágrafo na página "About"', () => {
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );

    const secondParagraph = screen.getByText('by type', {
      exact: false,
    });

    expect(secondParagraph).toBeInTheDocument();
  });

  test('verificar se existe uma imagem na página "About"', () => {
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
  });
});
