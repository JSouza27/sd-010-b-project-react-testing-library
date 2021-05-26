import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

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
    const { history: { location } } = renderWithRouter(<App />);

    userEvent.click(screen.getByText('Home'));
    const { pathname } = location;

    expect(pathname).toBe('/');
  });

  it('tests if aplication is redirected to About page by clicking About link', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByText(/About/i));

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('redirected to Favorite Pokémons page by clicking Favorite Pokémons link', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByText(/Favorite Pokémons/i));

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('show Not Found page when happens', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/whatever');

    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
