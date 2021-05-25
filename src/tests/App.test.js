import React from 'react';
// import { screen } from '@testing-library/react';
import App from '../App';
import renderWitRouter from '../components/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  // renderiza uma reading() com o texto `Pokédex`
  test('renders a reading with the text `Pokédex`', () => {
    const { getByRole } = renderWitRouter(<App />);
    const heading = getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });
    // const heading = getByText(/Pokédex/i)
    expect(heading).toBeInTheDocument();
  });

  // test('shows the Pokédex when the route is `/`', () => {
  //   const { getByText } = render(
  //     <MemoryRouter initialEntries={ ['/'] }>
  //       <App />
  //     </MemoryRouter>,
  //   );

  //   expect(getByText('Encountered pokémons')).toBeInTheDocument();
  // });
});
