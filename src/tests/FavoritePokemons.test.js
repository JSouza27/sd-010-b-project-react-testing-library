import React from 'react';
import renderWithRoute from '../helper/renderWithRoute';
import App from '../App';

describe('Request 3', () => {
  it('shows "no pokemon found" message if dont have favorite pokémons', () => {
    const { getByText, history } = renderWithRoute(<App />);
    history.push('/favorites');

    const anyPokemon = getByText(/no favorite pokemon found/i);
    expect(anyPokemon).toBeInTheDocument();
  });
});
