import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('testing in-app directions', () => {
  test('mostrar um texto com valor  `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('pokédex for the route `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('pokémons')).toBeInTheDocument();
  });

  it(
    'test that the set of links has a correct route',
    () => {
      const { getAllByRole } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const componets = getAllByRole('link');
      expect(componets[0]).toHaveTextContent('Home');
      expect(componets[1]).toHaveTextContent('About');
      expect(componets[2]).toHaveTextContent('Favorite Pokémons');
    },
  );
});
