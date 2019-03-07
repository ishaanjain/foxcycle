<template>
  <div class="home">
    <div class="tile is-ancestor">
      <div class="hours tile is-vertical is-parent is-3">
        <div class="tile is-child box">
          <p class="title" >OPEN</p>
        </div>
        <div class="tile is-child box">
          <p class="title">Hours</p>
            <a class="button is-light" v-if="isLoggedIn" >Edit</a>
            <table style="width:100%">
              <tr>
                <th>Weekdays</th>
                <th>Weekends</th> 
                <th></th>
              </tr>
              <tr>
                <td>8 am - 7 pm</td>
                <td>10 am - 6 pm</td> 
                <td></td>
              </tr>
            </table>
            <br>
            <br>
            <div class="location tile">
              
              <a href="https://maps.calpoly.edu/place/bldg-014-0/@35.3084197,-120.6805840,14.1z">
                14256 Frank Pilling Road, San Luis Obispo, 93407
              </a>
              </div>
          </div>
      </div>

      <div class="announcement tile is-parent is-vertical">
        <div class="tile is-child box">
          <p class="title">Announcement</p>
          <a class="button is-light" v-if="isLoggedIn" v-on:click="showLoginModal()">Edit</a>
        </div>
        <div class="tile is-child">
          <p class="title">Featured</p>
          <div class="container products-container">
               <div class="p-parent">
                  <div v-for="(item, index) in items" v-bind:key="index">
                     <router-link :to="{name: 'product detail', params: { id: item.id.toString() }}">
                        <div class="box product">
                           <h1 class="product-title title is-5">{{item.name}}</h1>
                           <img class="product" :src=item.imageUrls>
                           <p class="title is-5 item-price">${{item.price}}  </p>
                        </div>
                     </router-link>
                  </div>
               </div>
            </div>
        </div>
      </div>
      
    </div>
    
    <footer class="footer">

    <div class="content has-text-centered">
      <p>
        <strong>WhiteSky</strong> 2019<a href="https://jgthms.com"></a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
    </div>
</footer>
<Announcement v-bind:is-showing="showAnnounce" v-on:success="successLogin()" v-on:cancel="cancelLogin()"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Announcement from "../components/Announcement.vue"
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "../models/product.interface";
import axios, { AxiosResponse } from "axios";

@Component({
  components:{
    Announcement
  }
})

export default class Home extends Vue {
  public showAnnounce: boolean = false;
  public items: iProduct[] = [];
  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  showLoginModal() {
    this.showAnnounce = true;
  }

  successLogin() {
    this.showAnnounce = false;
  }

  cancelLogin() {
    this.showAnnounce = false;
  }

  getItems() {
    axios.get(APIConfig.buildUrl("/products"), {
      headers: {
        token: this.$store.state.userToken
      },
      params: {
        filters: []
      }
    })
    .then((response) => {
        this.items = response.data.products.slice(0, 3);
    });
  }

  mounted() {
    this.getItems();
  }

}

</script>


<style scoped lang="scss">
  .home {
    max-width: unset;
    width: unset;
    margin: 2%;
  }
</style>