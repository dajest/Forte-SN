import { createStore } from 'vuex';
import peopleList from '../api/getPeople';

export default createStore({
  state: {
    listOfPeople: peopleList
  },

  getters: {
    getPersonByID: (state) => (id: any) => {
      return state.listOfPeople[id];
    },
    getFullPeopleList: state => state.listOfPeople
  },

  mutations: {
    getPeopleList: (state, list) => {
      state.listOfPeople = list
    }
  },

  actions: {
    getPeople: context => {
      const list = peopleList;
      setTimeout(()=> {
        context.commit('getPeopleList', list)

      }, 2000)
    }
  },
  modules: {
  }
})
