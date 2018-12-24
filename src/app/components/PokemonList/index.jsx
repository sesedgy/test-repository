import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PokemonCard from '../PokemonCard';


class PokemonList extends Component {
  state = {
  };

  componentDidMount() {

  }

  render() {
    // const { } = this.state;
    const { appState, pokemonList = [] } = this.props;
    console.log(appState.typesUrlsList);
    return (
      <div>
        {pokemonList.map(pokemon => <PokemonCard pokemon={pokemon} />)}
      </div>
    );
  }
}

PokemonList.propTypes = {
  appState: PropTypes.shape({}).isRequired,
  pokemonList: PropTypes.shape({}).isRequired,
};

export default inject('appState')(observer((withRouter(PokemonList))));
