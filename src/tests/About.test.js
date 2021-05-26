import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('Contains an h2 tag containing About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);

  const pageTitle = getByRole('heading', {
    level: 2,
    name: /about pokédex/i,
  });

  expect(pageTitle).toBeInTheDocument();
});

test('contains two paragraphs', () => {
  const { getByText } = renderWithRouter(<About />);

  const beginningPhase = (/This application simulates a Pokédex,/i);
  const endPhase = (/One can filter Pokémons by type,/i);

  const phaseOne = getByText(beginningPhase);
  const phaseTwo = getByText(endPhase);

  expect(phaseOne).toBeInTheDocument();
  expect(phaseTwo).toBeInTheDocument();
});
