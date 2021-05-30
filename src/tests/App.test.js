import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('if the top of the application contains a fixed set ofnavigation links', () => {
  it('The first  link must have the text Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('Home').innerHTML;
    expect(link).toBe('Home');
  });
});
