import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';

describe('NotFound', () => {
  it('página contém um heading h2 com o texto Page requested not found', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('algumacoisa');
    const el = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(el).toBeInTheDocument();
  });
  it('página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const history = createMemoryHistory();
    const notfound = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('algumacoisa');
    const el = notfound.container.querySelector('.not-found-image');
    expect(el).toBeInTheDocument();
    expect(el).toHaveProperty(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
