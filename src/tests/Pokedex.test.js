import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Requirement 05', () => {
  test('Testa se contém title', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading',
      {
        level: 2,
        name: 'Encountered pokémons',
      });

    expect(heading).toBeInTheDocument();
  });
});
