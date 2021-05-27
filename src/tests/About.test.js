import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('testing the `About` component', () => {
  test('check if the page contains information about Pokédex', () => {
    render(<About />);

    const INFO_POKEDEX = 'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons';

    expect(screen.getByText(INFO_POKEDEX)).toBeInTheDocument();
  });

  test('check if the page contains an `h2` heading with the text `About Pokédex`',
    () => {
      render(<About />);

      expect(screen.getByRole('heading')).toHaveTextContent('About Pokédex');
    });

  test('check if the page contains two paragraphs with text about Pokédex',
    () => {
      render(<About />);

      expect(screen.getByText(/This application/)).toBeInTheDocument();
      expect(screen.getByText(/One can filter Pokémons/)).toBeInTheDocument();
    });

  test('check if the page contains a Pokédex image', () => {
    render(<About />);
    // preciso recuperar a imagem
  });
});
