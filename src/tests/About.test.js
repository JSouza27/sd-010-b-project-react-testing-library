import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import About from '../components/About';
import renderWithRoute from '../helper/renderWithRoute';

describe('Request 2', () => {
  it('contains a h2 with the text About Pokédex', () => {
    renderWithRoute(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    fireEvent.click(about);

    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('contains 2 paragraphs about Pokédex', () => {
    const { container } = renderWithRoute(<About />);
    const paragraph = container.getElementsByTagName('p');
    expect(paragraph[0]).toBeInTheDocument();
    expect(paragraph[1]).toBeInTheDocument();
  });

  it('contains the following image', () => {
    renderWithRoute(<About />);
    const img = screen.getByAltText('Pokédex');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
