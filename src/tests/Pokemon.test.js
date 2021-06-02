import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  const MORE_DETAILS = 'More details';
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/');

    const moreDetails = getByText(MORE_DETAILS);
    userEvent.click(moreDetails);

    const name = getByText('Pikachu');
    const type = getByText('Electric');
    const peso = getByText('Average weight: 6.0 kg');
    const img = getByRole('img', { name: 'Pikachu sprite' });
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(peso).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para 
  exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,
  onde <id> é o id do Pokémon exibido;`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');

    const moreDetails = getByText(MORE_DETAILS);
    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it(`Teste se ao clicar no link de navegação do Pokémon,
   é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');

    const moreDetails = getByText(MORE_DETAILS);
    userEvent.click(moreDetails);

    const details = getByText('Pikachu Details');
    expect(details).toBeInTheDocument();
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/');

    const moreDetails = getByText(MORE_DETAILS);
    userEvent.click(moreDetails);
    const favorite = getByText('Pokémon favoritado?');
    userEvent.click(favorite);
    const imgStar = getAllByRole('img')[1];

    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
