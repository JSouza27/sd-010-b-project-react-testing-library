import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Check if notFoundPage exists', () => {
  it('Should redirect to notFoundPage when goes to strange pages', () => {
    const { getByRole, getByAltText, history } = renderWithRouter(<App />);
    history.push('/strangepage');

    const notFoundText = getByRole('heading', {
      level: 2,
    });
    const {
      src,
    } = getByAltText('Pikachu crying because the page requested was not found');

    expect(notFoundText).toHaveTextContent('Page requested not found 😭');

    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
