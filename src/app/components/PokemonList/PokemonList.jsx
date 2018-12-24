import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonCard from '../PokemonCard';

class PokemonList extends Component {
  state = {
  };

  render() {
    const { pokemonList } = this.props;
    console.log(pokemonList);
    return (
      <div>
        {pokemonList.map(pokemon => <PokemonCard pokemon={pokemon} />)}
      </div>
    );
  }
}

PokemonList.propTypes = {
  pokemonList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PokemonList;
