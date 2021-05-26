test('Se é renderizado o pokemon clicado com as info', () => {
  RenderRouter(<App />);
  const pokeName = screen.getByText('Pikachu');
  const pokeType = screen.getByText('Electric');
  const pokeWeight = screen.getByText('Average weight: 6.0 kg');
  const detailsLink = screen.getByRole('link', {
    name: /More Details/i,
  });
  userEvent.click(detailsLink);
  expect(pokeName).toHaveTextContent(/Pikachu/i);
  expect(pokeType).toHaveTextContent(/Electric/i);
  expect(pokeWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
});