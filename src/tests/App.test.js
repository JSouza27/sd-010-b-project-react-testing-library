import React from 'react';
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

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
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
