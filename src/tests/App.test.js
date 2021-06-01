import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  test('se a página principal da App é renderizada ao caminho de URL `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homepageText = getByText('Encountered pokémons');
    const URL = '/';

    history.push(URL);
    expect(homepageText).toBeInTheDocument();
  });

  test('se o topo da aplicação contém o conjunto fixo de links de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: /home/i });
    const secondLink = screen.getByRole('link', { name: /about/i });
    const thirdLink = screen.getByRole('link', { name: /favorite pokémons/i });
    const URL = '/';

    history.push(URL);
    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para Home ao clicar na URL `/`', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const homepageLink = screen.getByRole('link', { name: /home/i });
    const URL = history.location.pathname;
    const pageText = getByText('Encountered pokémons');
    const expected = '/';

    userEvent.click(homepageLink);
    expect(URL).toBe(expected);
    expect(pageText).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para About ao clicar na URL `/about`', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const home = '/';
    history.push(home);

    const aboutPageLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutPageLink);

    const URL = history.location.pathname;
    const pageText = getByText('About Pokédex');
    const expected = '/about';

    expect(URL).toBe(expected);
    expect(pageText).toBeInTheDocument();
  });

  test('se ao clicar aplicação é redirecionada para a URL `/favorites`', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const home = '/';
    history.push(home);

    const favoritesPageLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesPageLink);

    const URL = history.location.pathname;
    const pageText = getByText('Favorite pokémons');
    const expected = '/favorites';

    expect(URL).toBe(expected);
    expect(pageText).toBeInTheDocument();
  });

  test('se a aplicação aciona a página Not Found quando a URL é desconhecida', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const randomURL = '/random-url';
    history.push(randomURL);

    const pageText = getByText('Page requested not found');

    expect(pageText).toBeInTheDocument();
  });
});
