<template>
  <div class="services tile is-ancestor">
    <div class="title">
      <p class="subtitle"> All Services are performed in store</p>
      <div>
      <a class="button is-light" v-if="isLoggedIn" v-on:click="showAddServiceModal()">Add a New Service</a>
      </div>
            <div class="container products-container">
               <div class="p-parent">
                  <div v-for="(item, index) in items" v-bind:key="index">
                    <router-link :to="{name: 'service detail', params: { id: item.id.toString() }}">
                        <div class="box product"> 
                           <h1 class="product-title title">{{item.name}}</h1>
                           <p class="product-title item-price is-5">${{item.price}}</p>
                           <p class="product-description  title is-5">{{item.description}} </p>
                        </div>
                        </router-link>
                  </div>
               </div>
            </div>
        </div>
      <AddNewService v-bind:is-showing="showAddService" v-on:success="successAddService()" v-on:cancel="cancelAddService()"/>

      </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import App from "@/App.vue";
import AddNewService from "@/components/AddNewService.vue";
import { APIConfig } from "../utils/api.utils";
import { iService } from '@/models/service.interface';
import { debug } from 'util';
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    App, AddNewService
  }
})
export default class Services extends Vue {

  public items: iService[] = [];
  public showAddService: boolean = false;

    @Prop(String) id!: string;
  
  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

    getItems() {
    axios.get(APIConfig.buildUrl("/services"), {
      headers: {
        token: this.$store.state.userToken
      }
    })
    .then((response) => {
    debugger;
        this.items = response.data.services;
    });
  }

  showAddServiceModal() {
      this.showAddService = true;
  }

  successAddService() {
    this.showAddService = false;
    this.getItems();
  }
  cancelAddService() {
    this.showAddService = false;
  }

  mounted(){
    this.getItems();
  }

}


</script>

<style scoped lang="scss">

  .services {
    margin: 2%;
  }
  h1.product-title {
  height: 20px;
  margin-bottom: 0px;
}
  
  h1.product-description {
  height: 10px;
  margin-bottom: 0px;
}


img.product {
  height: 76%;
  margin: 0px 0px 16px 0px;
}

.product:hover {
  cursor: pointer;
}

.product {
  height: 200px;
  width: 300px;
  float: left;
  margin: 14px;
}
.edit-product {
  margin-right: 14px;
}

.p-parent {
  width: 88%;
}

.item-price {
  text-align: right;
}

.filter-types {
  padding-bottom: 26px;
}

h4.filter-header.subtitle {
  margin-bottom: 4px;
}

.products {
  margin-top: 20px;
}

.apply-button {
  margin-right: 10px;
}
</style>