/**
 * Created by vaibhav on 16/4/18
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as $ from 'jquery';
import * as actions from './actions';
import PokemonCard from '../../components/PokemonCard';
import ErrorPanel from '../../components/ErrorPanel';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.state = { order: '' };
    const a = 1 === 1;
  }

  componentWillMount() {
    this.props.actions.fetchPokemonList(20, 1);
  }

  componentDidMount() {
    $(window).scroll(() => {
      if ($(window).scrollTop() === $(document).height() - $(window).height() && !this.props.pokemonList.loading) {
        this.props.actions.fetchPokemonList(Object.values(this.props.pokemonList.pokemons).length + 20, Object.values(this.props.pokemonList.pokemons).length + 1);
      }
    });
  }

  sort(e) {
    this.setState({ order: e.target.value });
    const order = e.target.value;
    this.props.pokemonList.pokemons = Object.values(this.props.pokemonList.pokemons).sort((param1, param2) => {
      switch (order) {
        case 'Lowest Number First':
          return param1.id - param2.id;

        case 'Highest Number First':
          return param2.id - param1.id;

        case 'Z - A':
          return param2.name.localeCompare(param1.name);

        case 'A - Z':
          return param1.name.localeCompare(param2.name);

        default:
          return param1.id - param2.id;
      }
    });
  }

  render() {
    const { pokemonList } = this.props;
    return (
      <div className="container">
        <div className="field is-horizontal is-grouped is-grouped-right">
          <div className="control">
            <div className="field-body">
              <div className="select is-primary">
                <select
                  value={this.state.order}
                  onChange={this.sort}
                >
                  <option>Lowest Number First</option>
                  <option>Highest Number First</option>
                  <option>A - Z</option>
                  <option>Z - A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {Object.values(pokemonList.pokemons).map((items, index) => (index % 4 === 0
          ? (
            <div className="columns is-centered" key={index}>
              {Object.values(pokemonList.pokemons).slice(index, index + 4).map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
            </div>
          )
          : undefined))}
        {(pokemonList.loading)
          ? <section><span className="loader" style={{ margin: 'auto' }} /></section>
          : (pokemonList.error)
            ? <ErrorPanel errors={[pokemonList.error]} />
            : undefined
                }
      </div>
    );
  }
}


PokemonList.propTypes = {
  pokemonList: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    pokemonList: state.pokemonListReducer.pokemonList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const PokemonListContainer = connect(mapStateToProps, mapDispatchToProps)(PokemonList);

export default withRouter(PokemonListContainer);
