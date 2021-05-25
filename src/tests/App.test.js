import React from 'react';
import renderWithRouter from '../helpers/renderWithRouters';
import App from '../App';

describe('Testa requisito 1 App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is "/" ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/';
    history.push(route);

    const home = getByText('Home');
    const about = getByText('About');
    const favorite = getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
