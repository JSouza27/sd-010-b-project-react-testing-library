import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: 'Poison' }));
    const img = getByRole('img');
    expect(getByTestId('pokemon-name').textContent).toBe('Ekans');
    expect(getByTestId('pokemon-type').textContent).toBe('Poison');
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.9 kg');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
    expect(img).toHaveAttribute('alt', 'Ekans sprite');
  });

  it('Testa se é feito o redirecionamento da aplicação para a página de detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
