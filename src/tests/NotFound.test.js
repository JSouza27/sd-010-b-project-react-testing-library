import React from 'react';
import App from '../App';
// import NotFound from '../components';
import renderWithRouter from './renderWithRouter';

describe('tests the <FavoritePokemons /> component', () => {
  test('if page contains an h2 heading with the text Page requested not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    // Porque al renderizar direto o componete <NotFound /> não funciona?
    history.push('pagina-que-nao-existe');
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('whether page shows the specific image', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('pagina-que-nao-existe');
    const image = getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    // const image = document.querySelector('img');
    // expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
