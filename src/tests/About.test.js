import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('about test', () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );

  const aboutTxt = screen.getByRole('heading', {
    name: /about pokédex/i,
    level: 2,
  });
  expect(aboutTxt).toBeInTheDocument();

  const imageLink = screen.getByAltText('Pokédex');
  expect(imageLink.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

  const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
  expect(paragraph1).toBeInTheDocument();

  const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
  expect(paragraph2).toBeInTheDocument();
});
