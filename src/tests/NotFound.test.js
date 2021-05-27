import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 4 - Test the <NotFound.js> component', () => {
  test('', () => {
    // Acessar componentes
    const { getByRole } = renderWithRouter(<NotFound />);

    // Manipular componentes

    // Testar componentes
    const notFound = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('Tests if the page contains a specific image of a Pokédex', () => {
    // Acessar componentes
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    // Manipular componentes

    // Testar componentes
    const imagePath = getAllByRole('img', {
      alt: 'Pikachu crying because the page requested was not found',
    });
    expect(imagePath[1]).toHaveAttribute('src', imageSrc);
  });
});
