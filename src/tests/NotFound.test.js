import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente <NotFound />', () => {
  test('Contém um heading h2', () => {
    renderWithRouter(<NotFound />);

    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(pageNotFound).toBeInTheDocument();
  });

  test('Mostra uma imagem específica', () => {
    renderWithRouter(<NotFound />);

    const alt = 'Pikachu crying because the page requested was not found';
    const logo = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const imageNotFound = screen.getByAltText(alt);
    expect(imageNotFound).toBeInTheDocument();

    const imageAbout = screen.getAllByRole('img');
    expect(imageAbout[1]).toHaveAttribute('src', logo);
  });
});
