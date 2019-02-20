<template>
   <div class="products">
      {{this.getItems()}}
      <a class="button is-light" v-if="isLoggedIn" v-on:click="showAddProductModal()">Add a New Product</a>
      <AddNewProduct v-bind:is-showing="showAddProduct" v-on:success="successAddProduct()" v-on:cancel="cancelAddProduct()"/>
      <div class="container products-container">
         <div class="tile is-ancestor">
            <div v-for="(item, index) in items" v-bind:key="index">
               <router-link :to="{name: 'product detail', params: { id: item.id.toString() }}">
                  <div class="tile is-child box product">
                     <h2>{{item.name}}</h2>
                     <img class="product" :src=item.imageUrls>
                  </div>
               </router-link>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import App from "@/App.vue";
import AddNewProduct from "@/components/AddNewProduct.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Product } from "../../../api/entity";

@Component({
  components: {
    App, AddNewProduct
  }
})
export default class Products extends Vue {
  public showAddProduct: boolean = false;
  public items: Product[] = [];

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  getItems() {
    axios.get(APIConfig.buildUrl("/products"), {
      headers: {
        token: this.$store.state.userToken
      }
    })
    .then((response) => {
        this.items = response.data.products;
    });
    
  }

  showAddProductModal() {
      this.showAddProduct = true;
  }

  successAddProduct() {
    this.showAddProduct = false;
    this.getItems();
  }
  cancelAddProduct() {
    this.showAddProduct = false;
  }

  mounted() {
    this.getItems();
  }

  // goToItemDetail(id: string) {
  //   this.$router.push({ path: `/products/${id}` });
  // }

}

</script>

<style lang="scss">

img.product {
  height: 200px;
}

.product:hover {
  cursor: pointer
}

</style>