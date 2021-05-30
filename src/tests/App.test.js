import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('if on the application contains a fixed set of navigation links', () => {
  it('The first  link must have the text Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('Home').innerHTML;
    expect(link).toBe('Home');
  });

  it('The second link must have the text About', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('About').innerHTML;
    expect(link).toBe('About');
  });

  it('The third link must have the text Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('Favorite Pokémons').innerHTML;
    expect(link).toBe('Favorite Pokémons');
  });
});

test('is redirected to the home page (/) by clicking on the Home link.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const home = getByText(/Encountered pokémons/);
  expect(home).toBeInTheDocument();
});

/*   it('The application must be redirected to the Not Found page when entering an unknown URL', () => {
    const { getByText } = renderWithRouter(<App />);
    const link
  */
