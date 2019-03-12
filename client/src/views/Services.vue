<template>
  <div class="services tile is-ancestor">
    <div class="title is-vertical">
      <p class="subtitle"> All Services are performed in store</p>
    
    <div class="tile is-parent">
    <div class="tile is-parent is-vertical">
      
      <div class="tile is-child box">
        <p class="title">Install</p>
          <body>
            BAR TAPE     $20 <br>
            BASKET     $15
            BOTTOM BRACKET     $30 <br>
            CASSETTE/FREEWHEEL/COG     $15 <br>
            CHAIN      $12 <br>
            HEADSET     $40 <br>
            RACK     $20 <br>
            SPOKE     $25 (FRONT)/$35 (REAR) <br>
            TUBE     $8 <br>
          </body>
        </div>
      </div>

    <div class="tile is-parent">
      <div class="tile is-child box">
      <p class="title">Tune-Ups & Builds</p>
                        <div v-for="(item, index) in items" v-bind:key="index">
                     <router-link :to="{Name: 'product detail', params: { id: item.id.toString() }}">
                        <div class="box product">
                           <h5 class="title is-5">{{item.Description}}</h5>
                           <h3 class="item-price">${{item.Price}}</h3>
                        </div>
                     </router-link>
                  </div>
        </div>
      </div>
  
    </div>
    </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import App from "@/App.vue";
import { APIConfig } from "../utils/api.utils";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component
export default class Services extends Vue {


  public items: Service[] = [];

    getItems() {
    axios.get(APIConfig.buildUrl("/services"), {
      headers: {
        token: this.$store.state.userToken
      }
    })
    .then((response) => {
        this.items = response.data.products;
      
    console.log(response);
    
    });
  }
  mounted(){
    this.getItems();
  }

}

interface Service {
    Name: string;
    Description: string;
    Price: number;
  }

</script>

<style scoped lang="scss">

  .services {
    margin: 2%;
  }
</style>