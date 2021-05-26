import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('Testing Not Found page', () => {
  const { getByRole, container } = render(<NotFound />);
  const heading = getByRole('heading', { level: 2 });
  const image = container.querySelector('img');
  const imageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(heading).toContainHTML('Page requested not found');
  expect(image).toHaveAttribute('src', imageSrc);
});
