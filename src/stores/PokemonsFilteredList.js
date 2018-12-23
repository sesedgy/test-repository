import { observable, action } from 'mobx';
import {API_PATHS} from "../constants";
import ApiService from "../services/apiService";
import AppState from "./AppState";

class PokemonsFilteredList {
  @observable
  pokemonsFilteredList;

  @action
  async filterByPage(offset = 1, limit = this.pokemonsCount) {
    let promisesList = [];
    for (let i = offset; i <= limit; i++) {
      promisesList.push(ApiService.get(API_PATHS.GET.POKEMONS_LIST + '/' + i));
    }
    this.pokemonsFilteredList = await ApiService.getList(promisesList);
  }

  @action
  async filterByName(name) {
    let promisesList = [];
    let filteredPokemonsNumbers = [];
    name = name.toLowerCase();
    AppState.instance().pokemonsUrlsList.forEach((item, index) => {
      if(item.name.toLowerCase().indexOf(name) === 0){
        filteredPokemonsNumbers.push(index + 1);
      }
    });
    promisesList = filteredPokemonsNumbers.map((number) => {
      return ApiService.get(API_PATHS.GET.POKEMONS_LIST + '/' + number)
    });
    this.pokemonsFilteredList = await ApiService.getList(promisesList);
  }

  @action
  async filterByType(typeUrls) {
    let promisesList = [];
    let typesPromisesList = typeUrls.map(url => {
      return ApiService.getByFullUrl(url);
    });
    let typesList = await ApiService.getList(typesPromisesList);
    typesList.forEach(type => {
      type.pokemon.forEach(pokemon => {
        promisesList.push(pokemon.pokemon.url)
      })
    });
    this.pokemonsFilteredList = await ApiService.getList(promisesList);
  }
}

export default PokemonsFilteredList;
