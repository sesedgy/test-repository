import { observable, computed, action } from 'mobx';
import { API_PATHS } from '../constants';
import ApiService from '../services/apiService';
import loaderStore from './LoaderStore';

class AppState {
  constructor() {
    this.initAppState();
  }

  @observable
  pokemonsUrlsList;

  @observable
  typesUrlsList;

  @action
  initAppState() {
    loaderStore.show();
    Promise.all([
      ApiService.get(API_PATHS.GET.POKEMONS_LIST),
      ApiService.get(API_PATHS.GET.TYPES_LIST),
    ]).then((results) => {
      this.pokemonsUrlsList = results[0].results;
      this.typesUrlsList = results[1].results;
      loaderStore.hide();
    }).catch(() => {
      loaderStore.hide();
      // TODO тут обрабатывать ошибку
    });
  }

  @computed
  get pokemonsCount() {
    return this.pokemonsUrlsList.length;
  }
}

const appState = new AppState();
export default appState;
