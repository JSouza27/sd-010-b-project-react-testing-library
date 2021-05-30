import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import App from '../App';
import About from '../components/About';

const { MemoryRouter } = require('react-router');

describe('Request 2', () => {
  it('contains a h2 with the text About Pokédex', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = getByRole('link', { name: /about/i });
    fireEvent.click(about);

    const title = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('contains 2 paragraphs about Pokédex', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const paragraph = container.getElementsByTagName('p');
    expect(paragraph[0]).toBeInTheDocument();
    expect(paragraph[1]).toBeInTheDocument();
  });

  it('contains the following image', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const img = getByAltText('Pokédex');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
