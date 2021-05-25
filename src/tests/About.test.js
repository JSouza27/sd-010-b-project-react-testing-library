import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Test "About" component', () => {
  it('renders info about Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    // const info = getByRole('dialog');
    expect(container).toBeInTheDocument();
  });

  it('renders heading with "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { level: 2, name: /about pokédex/i });

    expect(title).toBeInTheDocument();
  });

  it('renders 2 paragraphs about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('has image from Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img', { name: /pokédex/i });
    const { src } = image;

    expect(image).toBeInTheDocument();
    expect(src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
