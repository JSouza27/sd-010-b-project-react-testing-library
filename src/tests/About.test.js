import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste do requisito 2', () => {
  it('Verifica se a página contém as informação sobre a Pokedéx', () => {
    const { getByRole, getAllByText } = renderWithRouter(<About />);

    const headingPokedex = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })

    expect(headingPokedex).toBeInTheDocument();
  })
})
