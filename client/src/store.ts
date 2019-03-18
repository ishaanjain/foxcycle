import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { APIConfig } from "./utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";
import { iProductOrder } from './models/productOrder.interface';

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
  user: iUser | null;
  isAdmin: boolean;
  items: iProductOrder[];
}

interface iLoginPayload {
  token: string;
  userid: number;
}

const state: iRootState = {
  userToken: null,
  user: null,
  isAdmin: false,
  items: []
};

const mutations: MutationTree<iRootState> = {
  setUser(state, payload) {
    state.user = payload.user;
  },
  login(state, payload) {
    state.userToken = payload.token;
    state.user = payload.user;
    state.isAdmin = payload.isAdmin;
  },
  logout(state) {
    state.userToken = null;
    state.user = null;
    state.isAdmin = false;
  },
  cart(state, id) {
    state.items.push(id);
  },
  updateCart(state, payload) {
    state.items.forEach( function (order: iProductOrder){
      if (payload.id === order.id) {
        const additionalQuantity = parseInt(payload.additionalQuantity);
        order.quantity += additionalQuantity;
        order.price += (order.price / order.quantity) * additionalQuantity;
      }
    });
  }
};

const actions: ActionTree<iRootState, iRootState> = {
  async fetchUser({ commit }, payload) {
    const { userid, token } = payload;
    return axios.get(APIConfig.buildUrl(`/users/${userid}`), {
      headers: { token }
    }).then((res: AxiosResponse<{ user: iUser }>) => {
      commit("setUser", { user: res.data.user });
    });
  },
  async login({ commit, dispatch }, payload) {
    const { userid, token, isAdmin } = payload;
    return axios.get(APIConfig.buildUrl(`/users/${userid}`), {
      headers: { token }
    }).then((res: AxiosResponse<{ user: iUser }>) => {
      let user = res.data.user;
      commit("login", { user, token, isAdmin });
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
