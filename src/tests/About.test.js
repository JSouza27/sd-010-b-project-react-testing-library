import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import { About } from '../components';

test('check if the about page has a heading named Pokedex', () => {
  renderWithRouter(<About />);

  const aboutMeText = screen.getByRole('heading', {
    level: 2,
    name: /Pokédex/i,
  });
  expect(aboutMeText).toBeInTheDocument();
});

test('check if there are two paragraphs', () => {
  renderWithRouter(<About />);

  const paragraphs = screen.getByText((element) => element.toContain('One can filter'));

  expect(paragraphs).toBeInTheDocument();
});

test('check if there is an image of a pokedex', () => {
  renderWithRouter(<About />);

  const image = screen.getByAltText('Pokédex');

  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});

// https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src;
