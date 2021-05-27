import React, { Component } from 'react'
import Button from './Button';

class Locations extends Component {
  constructor(props){
    super(props);
this.state = {
  locations: [],
  page: 1,
};
  }


    componentDidMount() {
      fetch(`https://pokeapi.co/api/v2/location/?limit=10&offset=1.`)
      .then(res => res.json())
      .then(
        (response) => {
          console.log(response);
      this.setState({
        locations: response.results,
      });
    });
  }
  componentDidUpdate(){
    const page = this.state.page;
      fetch(`https://pokeapi.co/api/v2/location/?limit=10&offset=${page}.`)
      .then(res => res.json())
      .then(
        (response) => {
      this.setState({
        locations: response.results,
      });
    });
  }

  handlePreviusClick(){
    const currentPage = this.state.page;
    if(currentPage > 1) {
      this.setState({
        page: currentPage - 1,
      })
    }
    
  }
  handleNextClick(){
    const currentPage = this.state.page;
      this.setState({
        page: currentPage + 1,
      })
  }
  render () {
    const  { locations } = this.state;
    return (
      <section>
        <h2>Locations</h2>
        <ul>
          { locations.map((location, index) => {
          
        return <li key={ index }>
            <p>{ location.name }</p> 
            <a href={location.url}>{location.url}</a>
          </li> 
    }
    )}
        </ul>
        <button type="button" onClick={this.handlePreviusClick.bind(this)}>Anterior </button>
        <button type="button" onClick={this.handleNextClick.bind(this)} >Próximo</button>
      </section>
    );
  }
}

export default Locations;