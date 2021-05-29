import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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
test('show if app has a fixed nav bar', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText('Home');
  const aboutLink = getByText('About');
  const favoriteLink = getByText('Favorite Pokémons');

  const navBar = [homeLink, aboutLink, favoriteLink];

  navBar.forEach((link) => {
    fireEvent.click(link);
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
});
test('show if click on Home btn leads to home', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('Home'));
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
test('show if NotFound page works', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/pagina-errada'] }>
      <App />
    </MemoryRouter>,
  );
  const notFound = getByText(/Page requested not found/i);

  expect(notFound).toBeInTheDocument();
});
