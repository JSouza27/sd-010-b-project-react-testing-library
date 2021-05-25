import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando página Not found', () => {
  it('Testa se a página contém um heading h2 com texto page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const h2 = getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(h2).toBeInTheDocument();
  });
});
