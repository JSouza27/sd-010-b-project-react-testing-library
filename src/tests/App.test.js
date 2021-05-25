import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testing the App.js', () => {
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

  test('test if the main page has a group of links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();

    const aboutLink = getByText('About');
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = getByText('Favorite Pokémons');
    expect(favoriteLink).toBeInTheDocument();
  });

  test('when \'Home\' link is clicked is redirected to / URL', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText('Home');

    fireEvent.click(homeLink);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('when \'About\' link is clicked is redirected to /about URL', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = getByText('About');

    fireEvent.click(aboutLink);

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('when \'Favorite Pokémons\' is clicked is redirected to /favorites URL', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoriteLink = getByText('Favorite Pokémons');

    fireEvent.click(favoriteLink);

    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('when the URL is unknown, the page requested is the Not found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/pagina-qualquer');

    const unknownPage = getByText('Page requested not found');

    expect(unknownPage).toBeInTheDocument();
  });
});
