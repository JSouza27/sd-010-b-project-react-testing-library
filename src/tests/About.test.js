import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('requirement 2', () => {
  it('verify h2, p and src from About page', () => {
    const { history, getByRole, getByText } = renderWithRouter(<App />);
    history.push('/about');

    const H2 = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(H2).toBeInTheDocument();

    const paragraphOne = getByText(/This application simulates a Pokédex/);
    const paragraphTwo = getByText(/One can filter Pokémons by type/);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();

    const image = getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toHaveAttribute('src', src);
  });
});
