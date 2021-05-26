import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Test about page', () => {
  test('pokedex title', () => {
    renderWithRouter(<About />);

    const pageTitle = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(pageTitle).toBeInTheDocument();
  });
});
