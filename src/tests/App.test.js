import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('tests the whole App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('tests whether the top of the application contains a fixed set of navigation links',
    () => {
      const { getAllByRole } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const links = getAllByRole('link');
      expect(links[0]).toHaveTextContent('Home');
      expect(links[1]).toHaveTextContent('About');
      expect(links[2]).toHaveTextContent('Favorite Pokémons');
    });

  it('tests if aplication is redirected to the main page by clicking Home link', () => {

  });
});
