import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import About from '../components/About';

describe('Check title, content and image url.  ', () => {
  test('Checking if there is a <h2 /> for the title. ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    // <img> = role=img
    // role=heading, aria-level = 2. Porque é h2
    const title = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(title).toHaveTextContent('About Pokédex');
  });

  test('Checking img url', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  // Array.prototype.slice.call(document.querySelectorAll('p'));

  test('Checking quantity of paragraphs', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const nodesArray = [].slice.call(document.querySelectorAll('p'));
    expect(nodesArray.length).toBe(2);
  });
});
