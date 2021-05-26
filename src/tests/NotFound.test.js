import React from 'react';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';
import NotFound from '../components/NotFound';

describe('test the component NotFound', () => {
  test('renders a heading h2 with the text "Page requested not found 😭"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('pagina/pagina-nao-encontrada');
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  test('renders a image with the path "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const image = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
