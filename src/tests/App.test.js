import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Renders a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página principal da Pokédex é renderizada na URL `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  describe(('Teste se a app contém um conjunto fixo de links de navegação.'), () => {
    test('O primeiro link deve possuir o texto Home.', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText(/Home/i)).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto About.', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText(/About/i)).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto Favorite Pokémons.', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
    });
  });

  test('A aplicação é redirecionada para `/about`, ao clicar no link About.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('A aplicação é redirecionada `/favorites` ao clicar em Favorite Pokémons.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});
