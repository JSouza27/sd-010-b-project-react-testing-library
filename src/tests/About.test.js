import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <About.js />', () => {
  it('Testanto se há informações sobre a Pokédex', () => {
    const { getByText, getByAltText } = renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    const img = getByAltText('Pokédex');
    expect(aboutPokedex).toBeInTheDocument();
    expect(getByText(/This application simulates.../i)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons.../i)).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
