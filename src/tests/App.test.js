import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('tests the <App /> component', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});
