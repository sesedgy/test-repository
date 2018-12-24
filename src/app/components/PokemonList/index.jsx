import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PokemonList from './PokemonList';

const Component = inject('appState', 'pokemonsFilteredList')(observer(({ appState, pokemonsFilteredList }) => {
  if (appState.pokemonsUrlsList.length > 0) {
    pokemonsFilteredList.filterByPage();
  }
  return <PokemonList pokemonList={pokemonsFilteredList.pokemonsFilteredList} />;
}));

Component.displayName = 'UserList';
export default withRouter(Component);
