import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

/* test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homepageText = getByText('Encountered pokémons');
  expect(homepageText).toBeInTheDocument();
}); */

describe('Testa o componente <App.js />', () => {
  test('Teste se a página principal da App é renderizada ao caminho de URL `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homepageText = getByText('Encountered pokémons');
    const URL = '/';

    history.push(URL);
    expect(homepageText).toBeInTheDocument();
  });
});
