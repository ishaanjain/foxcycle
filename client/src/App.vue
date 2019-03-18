<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
      integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
      crossorigin="anonymous"
    >
    <div class="navbar">
      <div class="navbar-menu">
        <div class="navbar-logo">
          <router-link to="/" exact-active-class="is-active">
            <img class="foxcycle-logo-img" src="/foxcyclelogo.png">
            <p class="foxcycle-logo-text">FoxCycle</p>
          </router-link>
          <p class="foxcycle-logo-city">San Luis Obispo, CA</p>
        </div>
        <div class="navbar-start">
          <router-link class="navbar-item is-tab" to="/" exact-active-class="is-active">Home</router-link>
          <router-link class="navbar-item is-tab" to="/products" exact-active-class="is-active">Shop</router-link>
          <router-link
            class="navbar-item is-tab"
            to="/services"
            exact-active-class="is-active"
          >Services</router-link>
          <router-link
            class="navbar-item is-tab"
            v-if="isAdmin"
            to="/employees"
            exact-active-class="is-active"
          >Employees</router-link>
          <router-link class="navbar-item is-tab" to="/about" exact-active-class="is-active">About</router-link>
          <router-link
            class="navbar-item is-tab"
            to="/tracking"
            exact-active-class="is-active"
          >Tracking</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="fas fa-shopping-cart" v-on:click="showCartModal()"></a>
            <div class="buttons">
              <router-link
                class="button is-text"
                v-if="isLoggedIn"
                to="/my-profile"
                exact-active-class="is-active"
              >
                <i class="fas fa-user-alt"></i>
              </router-link>
              <a class="button is-light" v-if="!isLoggedIn" v-on:click="showLoginModal">Log in</a>
              <a class="button is-light" v-if="isLoggedIn" v-on:click="logout">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view class="container"/>
    <Login v-bind:is-showing="showLogin" v-on:success="hideLoginModal" v-on:cancel="hideLoginModal"/>
    <Cart v-if="showCart" v-on:success="goToCheckout" v-on:cancel="hideCartModal"/>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Phone Number: {{this.about.phone}}
          <br>
          Address: {{this.about.address}}
          <br>
          <strong>WhiteSky</strong> 2019
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { Component } from "vue-property-decorator";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import { APIConfig } from "@/utils/api.utils";
import { About } from "../../api/entity";
import Cart from "@/components/Cart.vue";

Vue.use(Buefy);

@Component({
  components: {
    Login,
    Cart
  }
})
export default class App extends Vue {
  public showLogin: boolean = false;
  public showCart: boolean = false;
  public about: About = {
    id: 0,
    description: "",
    imageurl: "",
    title: "",
    phone: "805-123-4567",
    address: ""
  };

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  get isAdmin(): boolean {
    return !!this.$store.state.isAdmin;
  }

  mounted() {
    this.getAbout();
  }

  getAbout() {
    axios.get(APIConfig.buildUrl(`/about`), {}).then(response => {
      // debugger;
      if (response.data.about != undefined) {
        this.about = response.data.about[0];
      }
    });
  }

  showLoginModal() {
    this.showLogin = true;
  }

  hideLoginModal() {
    this.showLogin = false;
  }

  showCartModal() {
    this.showCart = true;
  }

  hideCartModal() {
    this.showCart = false;
  }

  goToCheckout() {
    this.showCart = false;
    this.$router.push({ name: "checkout" });
  }

  logout() {
    axios
      .post(APIConfig.buildUrl("/logout"), null, {
        headers: { token: this.$store.state.userToken }
      })
      .then(() => {
        this.$store.commit("logout");
        this.$router.push({ name: "home" });
      });
  }
}
</script>


<style lang="scss">
$footer-background-color: white !default;
$footer-padding: 10rem 0rem 0rem !default;

@import "~bulma/css/bulma.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.footer {
  background-color: $footer-background-color;
  padding: $footer-padding;
}

.foxcycle-logo-img {
  height: 100px;
  width: 100px;
}

.navbar-start {
  margin-left: auto;
  margin-right: unset;
}

.foxcycle-logo-text {
  display: inline;
  font-size: 2.5rem;
  color: black;
}

.fas.fa-shopping-cart {
  margin-right: 25px;
  color: black;
}

.navbar-start {
  padding-top: 86px;
}

.navbar-end {
  padding-top: 86px;
}

.foxcycle-logo-city {
  padding-left: 6px;
}
</style>
