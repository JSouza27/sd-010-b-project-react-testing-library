import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

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

describe('test of the whole application', () => {
  it('Test if the top of the app contains a fixed set of navigation links', () => {
    const { queryAllByRole } = renderWithRouter(<App />);

    const link = queryAllByRole('link');
    expect(link[0].text).toBe('Home');
    expect(link[1].text).toBe('About');
    expect(link[2].text).toBe('Favorite Pokémons');
  });

  it('Go to the home by the Home link', () => {
    const { queryAllByRole } = renderWithRouter(<App />);
    const link = queryAllByRole('link');
    expect(link[0].pathname).toBe('/');
  });
  it('Go to the About by the About link', () => {
    const { queryAllByRole } = renderWithRouter(<App />);
    const link = queryAllByRole('link');
    expect(link[1].pathname).toBe('/about');
  });
  it('Go to the Pokémons Favoritados by the Favorite pokémons link', () => {
    const { queryAllByRole } = renderWithRouter(<App />);
    const link = queryAllByRole('link');
    expect(link[2].pathname).toBe('/favorites');
  });
  it('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/xablau'] }>
        <App />
      </MemoryRouter>,
    );
    const noMatch = getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
