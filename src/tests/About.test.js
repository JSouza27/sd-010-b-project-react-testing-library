import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 2 - Test the <About.js> component', () => {
  it('Tests if the page contains information about Pokédex', () => {
    // Acessar componentes
    const { getByText, history } = renderWithRouter(<About />);

    // Manipular componentes
    history.push('/about');

    // Testar componentes
    const { pathname } = history.location;
    const about = getByText(/About Pokédex/i);
    expect(pathname).toBe('/about');
    expect(about).toBeInTheDocument();
  });

  it('Tests if the page contains an h2 header with the text About Pokédex', () => {
    // Acessar componentes
    const { getByRole } = renderWithRouter(<About />);

    // Manipular componentes

    // Testar componentes
    const aboutHeader = getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutHeader).toBeInTheDocument();
  });

  it('Tests if the page contains two paragraphs with text about the Pokédex.', () => {
    // Acessar componentes
    const { getByText } = renderWithRouter(<About />);

    // Manipular componentes

    // Testar componentes

    const aboutParagraphOne = getByText(/This application simulates/i, { exact: false });
    const aboutParagraphTwo = getByText(/One can filter Pokémons by/i, { exact: false });
    expect(aboutParagraphOne).toBeInTheDocument();
    expect(aboutParagraphTwo).toBeInTheDocument();
  });

  it('Tests if the page contains a specific image of a Pokédex', () => {
    // Acessar componentes
    const { getByRole } = renderWithRouter(<About />);
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    // Manipular componentes

    // Testar componentes
    const imagePath = getByRole('img');
    expect(imagePath).toHaveAttribute('src', imageSrc);
  });
});
