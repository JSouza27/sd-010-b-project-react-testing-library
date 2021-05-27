import React from 'react';

class Locations extends React.Component{
  constructor() {
    super();

    this.fetchLocations = this.fetchLocations.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    this.state = {
      locations: [],
      offset: 0,
    };
  }

  componentDidMount() {
    this.fetchLocations();
  }

  fetchLocations(offset = 0) {
    const url = `https://pokeapi.co/api/v2/location/?limit=800`
    fetch(url)
      .then((response) => response.json())
      .then((response) => this.setState({ 
        locations: response.results,
        offset,
      }));
  }

  nextPage() {
    this.setState((prevState) => ({ 
      offset: prevState.offset + 20,
    }));
  }

  previousPage() {
    this.setState((prevState) => ({ 
      offset: prevState.offset - 20,
    }));
  }

  render() {
    const { locations, offset } = this.state;
    console.log(offset);
    return(
      <section>
        <h2>All locations</h2>
        <ul>
          { locations.filter((_, index) => index >= offset && index < (offset + 20)).map((entry) => {
            return <li key={entry.name}>{entry.name}</li>
          })}
        </ul>
        <button disabled={(offset === 0) ? true : false } onClick={ this.previousPage }>Anterior</button>
        <button disabled={(offset === 780) ? true : false }onClick={ this.nextPage }>Próxima</button>
        <p>Página {(offset === 0) ? 1 : (offset/20) + 1 } de 40</p>
      </section>
    )
  }
}

export default Locations;
