import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

describe('routes', () => {
  test('render a h2 with text `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });

  test('render a text that contains `Pokédex` ', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const firstP = getAllByText(/Pokédex/i);
    // console.log(firstP[1]);
    expect(firstP[0]).toBeInTheDocument();
    expect(firstP[1]).toBeInTheDocument();
  });

  test('render the right img', () => {
    const { getByRole } = renderWithRouter(<About />);

    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const img = getByRole('img');
    // console.log(img.src);
    expect(img.src).toContain(
      link,
    );
  });
});
