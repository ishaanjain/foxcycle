<template>
  <div class="products">
    {{this.getProduct()}}
    <!-- <a class="button is-light" v-if="isLoggedIn" v-on:click="showAddProductModal()">Add a New Product</a> -->
    <!-- <AddNewProduct v-bind:is-showing="showAddProduct" v-on:success="successAddProduct()" v-on:cancel="cancelAddProduct()"/> -->

    <p>Item Detail page</p>
    <div class="container products-container">
      <div class="tile is-ancestor">
          
          <div class="tile is-child box product">
            <!-- <h2 v-bind="this.item.name"></h2> -->
            <img class="product" :src="this.item.imageUrls">
          </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import App from "@/App.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Product } from "../../../api/entity";

@Component({
  components: {
    App
  }
})
export default class ProductDetail extends Vue {
  public showAddProduct: boolean = false;
  public item: Product = {
    id : 0,
    name : "",
    description : "",
    price : 0,
    imageUrls : "",
    stockCount : 0,
    tags : "",
    inStoreOnly : false
  };
  
  @Prop(String) id: string;

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  getProduct() {
    axios.get(APIConfig.buildUrl(`/products/${this.id}`), {
      params: {
        id: this.id
      }
    })
    .then((response) => {
        this.item = response.data.product;
    });
    
  }

  showAddProductModal() {
      this.showAddProduct = true;
  }

  successAddProduct() {
    this.showAddProduct = false;
    // this.getProduct();
  }
  cancelAddProduct() {
    this.showAddProduct = false;
  }

  mounted() {
    this.getProduct();
  }

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