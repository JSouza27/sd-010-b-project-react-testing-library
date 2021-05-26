import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import NotFound from '../components/NotFound';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

describe('routes', () => {
  test('tests if the page has a `h2` with the text `Page requested not found 😭`', () => {
    const { getByRole, getByText, getByLabelText } = renderWithRouter(<NotFound />);

    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toBeInTheDocument();

    const headingText = getByText('Page requested not found');
    expect(headingText).toBeInTheDocument();

    const span = getByLabelText('Crying emoji');
    // console.log(span);
    expect(span).toBeInTheDocument();

    const emoji = getByText('😭');
    // console.log(emoji);
    expect(emoji).toBeInTheDocument();
  });

  test('tests if theres an image with the right img', () => {
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const img = getAllByRole('img');
    // console.log(img[1].src);
    // console.log(typeof (img[1].src));
    // console.log(typeof (link));

    expect(img[1].src).toContain(link);
  });
});
