import { observable, action } from 'mobx';
import { API_PATHS } from '../constants';
import ApiService from '../services/apiService';
import AppState from './AppState';

class PokemonsFilteredList {
  @observable
  pokemonsFilteredList;

  @action
  async filterByPage(offset = 1, limit = this.pokemonsCount) {
    const promisesList = [];
    for (let i = offset; i <= limit; i++) {
      promisesList.push(ApiService.get(`${API_PATHS.GET.POKEMONS_LIST}/${i}`));
    }
    this.pokemonsFilteredList = await ApiService.getList(promisesList);
  }

  @action
  async filterByName(name) {
    let promisesList = [];
    const filteredPokemonsNumbers = [];
    name = name.toLowerCase();
    AppState.instance().pokemonsUrlsList.forEach((item, index) => {
      if (item.name.toLowerCase().indexOf(name) === 0) {
        filteredPokemonsNumbers.push(index + 1);
      }
    });
    promisesList = filteredPokemonsNumbers.map(number => ApiService.get(`${API_PATHS.GET.POKEMONS_LIST}/${number}`));
    this.pokemonsFilteredList = await ApiService.getList(promisesList);
  }

  @action
  async filterByType(typeUrls) {
    const promisesList = [];
    const typesPromisesList = typeUrls.map(url => ApiService.getByFullUrl(url));
    const typesList = await ApiService.getList(typesPromisesList);
    typesList.forEach((type) => {
      type.pokemon.forEach((pokemon) => {
        promisesList.push(pokemon.pokemon.url);
      });
    });
    this.pokemonsFilteredList = await ApiService.getList(promisesList);
  }
}

export default PokemonsFilteredList;
