<template>
  <div class="home">
    <div class="tile is-ancestor">
      <div class="hours tile is-vertical is-parent is-3">
        <div class="tile is-child box">
          <div class="tile">
            <figure class="image">
              <img src="../../public/close.gif">
          </figure>
          </div>
          <div class="tile is-child">
            <p class="title">Hours</p>
            <a class="button is-light" v-bind:class="{ 'is-hidden': !isLoggedIn}" >Edit</a>
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

          </div>
        </div>
      </div>

      <div class="announcement tile is-parent is-vertical">
        <div class="tile">
        <a class="button is-primary" v-bind:class="{ 'is-hidden': !isLoggedIn}" v-on:click="showLoginModal()">New Announcement</a>
        <a class="button is-danger" v-bind:class="{ 'is-hidden': !isLoggedIn}" v-on:click="deleteAnnounce()">Delete Announcement</a>
        </div>

        <div class="tile is-child box " v-bind:class="{ 'is-hidden': hasAnnounce()}" >
          <p class="title">{{this.announcement.title}}</p>
          
          <h2>{{ this.announcement.description}}</h2>
          <img  :src=this.announcement.imageurl>
          
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
    
    
<Announcement v-bind:is-showing="showAnnounce" v-on:success="successLogin()" v-on:cancel="cancelLogin()"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Announcement from "../components/Announcement.vue"
import { APIConfig } from "../utils/api.utils";
import { Announce } from "../../../api/entity";
import axios, { AxiosError, AxiosResponse } from "axios";
import { iProduct } from "../models/product.interface";


@Component({
  components:{
    Announcement
  }
})

export default class Home extends Vue {
  public showAnnounce: boolean = false;
  public announcement: Announce = {
    id : 0,
    description : "",
    imageurl : "",
    title:""
  };

  error: string | boolean = false;

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

  mounted (){
    this.getItems();
    this.getAnnounce();
    
  }

  getAnnounce() {
    axios.get(APIConfig.buildUrl(`/announce`), {})
    .then((response) => {
        if (response.data.announce.length > 0) {
          this.announcement = response.data.announce[0];
        }
    });
  }

  hasAnnounce (){
    return (this.announcement.description == "");
  }

  deleteAnnounce(){
    this.error = false;
    axios
      .delete(APIConfig.buildUrl("/announce"),{})
      .then((response) => {this.$emit("success");})
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
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

}

</script>


<style scoped lang="scss">
  .home {
    max-width: unset;
    width: unset;
    margin: 2%;
  }
</style>