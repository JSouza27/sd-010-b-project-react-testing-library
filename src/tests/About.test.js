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

  test('check if there is a first paragraph on the "About" page', () => {
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

  test('check if there is a second paragraph on the "About" page', () => {
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

  test('check if there is an image on the "About" page', () => {
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );

    const image = screen.getByRole('img');

    expect(image.src)
      .toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
