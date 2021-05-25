import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('if the top of the application contains a fixed set of navigation links', () => {
  it('The first link must have the text Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('Home').innerHTML;
    expect(link).toBe('Home');
  });

  it('The first link must have the text About', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('About').innerHTML;
    expect(link).toBe('About');
  });

  it('The first link must have the text Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('Favorite Pokémons').innerHTML;
    expect(link).toBe('Favorite Pokémons');
  });
});

test('by clicking on the Home link in the navigation bar.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const home = getByText(/Encountered pokémons/);
  expect(home).toBeInTheDocument();
});
