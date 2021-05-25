import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Requirement 4', () => {
  it('Verify components in no found page', () => {
    const { history, getByRole, getByAltText } = renderWithRouter(<App />);
    history.push('/noFoundPage');

    const H2 = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(H2).toBeInTheDocument();

    const image = getByAltText('Pikachu crying because the page requested was not found');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toHaveAttribute('src', src);
  });
});
