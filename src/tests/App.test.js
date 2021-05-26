import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing App.js', () => {
  it(' tests if App.js is rendered at "/" path', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });
});
