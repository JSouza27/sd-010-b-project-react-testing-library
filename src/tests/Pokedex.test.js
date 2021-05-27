import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const info1 = 'Encountered pokémons';

  const h2Element = getByRole('heading', { level: 2 });

  expect(h2Element).toBeInTheDocument();
  expect(h2Element).toHaveTextContent(info1);
});

test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const nameElement = getByTestId('pokemon-name');
  const typeElement = getByTestId('pokemon-type');
  const weightElement = getByTestId('pokemon-weight');

  const nextButton = getByText('Próximo pokémon');
  expect(nextButton).toBeInTheDocument();
  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();

  fireEvent.click(allButton);

  pokemons.forEach(({ averageWeight, name, type }) => {
    expect(nameElement).toHaveTextContent(name);
    expect(typeElement).toHaveTextContent(type);
    expect(weightElement).toHaveTextContent(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );

    fireEvent.click(nextButton);
  });

  const { averageWeight, name, type } = pokemons[0];

  expect(nameElement).toHaveTextContent(name);
  expect(typeElement).toHaveTextContent(type);
  expect(weightElement).toHaveTextContent(
    `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
  );
});

test('A Pokédex tem os botões de filtro', () => {
  const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);

  const buttons = getAllByTestId('pokemon-type-button');
  const nameElement = getByTestId('pokemon-name');
  const nextButton = getByText('Próximo pokémon');

  const buttonEletric = buttons[0];
  expect(buttonEletric).toHaveTextContent('Electric');
  fireEvent.click(buttonEletric);
  expect(nameElement).toHaveTextContent('Pikachu');
  expect(nextButton).toBeDisabled();

  const buttonFire = buttons[1];
  fireEvent.click(buttonFire);
  expect(nameElement).toHaveTextContent('Charmander');
  fireEvent.click(nextButton);
  expect(nameElement).toHaveTextContent('Rapidash');

  const buttonBug = buttons[2];
  fireEvent.click(buttonBug);
  expect(nameElement).toHaveTextContent('Caterpie');
  expect(nextButton).toBeDisabled();

  const buttonPoison = buttons[3];
  fireEvent.click(buttonPoison);
  expect(nameElement).toHaveTextContent('Ekans');
  expect(nextButton).toBeDisabled();

  const buttonPsychic = buttons[4];
  fireEvent.click(buttonPsychic);
  expect(nameElement).toHaveTextContent('Alakazam');
  fireEvent.click(nextButton);
  expect(nameElement).toHaveTextContent('Mew');

  const buttonNormal = buttons[5];
  fireEvent.click(buttonNormal);
  expect(nameElement).toHaveTextContent('Snorlax');
  expect(nextButton).toBeDisabled();

  const buttonDragon = buttons[6];
  fireEvent.click(buttonDragon);
  expect(nameElement).toHaveTextContent('Dragonair');
  expect(nextButton).toBeDisabled();
});
