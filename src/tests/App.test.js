import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// it('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

it('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const rota = '/';
  history.push(rota);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Testa se o topo da aplicação contém um conjunto de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('About')).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Teste se a app é redirecionada para a Home ao clicar no link', () => {
  it('Redireciona para a página Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(home);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Teste se a app é redirecionada para About ao clicar no link', () => {
  it('Redireciona para a página About', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(about);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
});

describe('Teste se a app é redirecionada para Favoritos ao clicar no link', () => {
  it('Redireciona para a página Favorites', () => {
    const { getByText } = renderWithRouter(<App />);
    const favorito = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favorito);
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });
});

describe('Teste se a app é redirecionada para Not Found', () => {
  it('Redireciona para Not Found (URL desconhecida)', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('url-desconhecida');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
