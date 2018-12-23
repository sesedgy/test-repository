import { observable, computed, action } from 'mobx';
import {API_PATHS} from "../constants";
import ApiService from "../services/apiService";

//Singleton
class AppState {
  constructor() {
    this.initAppState();
  }

  @observable
  pokemonsUrlsList;

  @observable
  typesUrlsList;

  static get instance() {
    if (!this.appState)
      this.appState = new AppState();
    return this.appState;
  }

  @action
  initAppState(){
    Promise.all([ApiService.get(API_PATHS.GET.POKEMONS_LIST), ApiService.get(API_PATHS.GET.TYPES_LIST)]).then((results) => {
      this.pokemonsUrlsList = results[0].results;
      this.typesUrlsList = results[1].results;
    }).catch((error) => {
      //TODO тут обрабатывать ошибку
    });
  }

  @computed
  get pokemonsCount() {
    return this.pokemonsUrlsList.length;
  }
}

export default AppState;
