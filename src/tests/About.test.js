import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';
import { About } from '../components';

describe('Test the component About', () => {
  test('renders a heading h2 with the text "About Pokédex" ', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    const linkAbout = getByRole('link', {
      name: 'About',
    });
    fireEvent.click(linkAbout);
    const aboutPage = history.location.pathname;
    const headingTwo = getByText(/About Pokédex/i);
    expect(aboutPage).toBe('/about');
    expect(headingTwo).toBeInTheDocument();
  });

  test('renders a image with o path "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png" ', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img', { name: /pokédex/i });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
