<template>
  <div class="products">
    {{this.getItems()}}
    <h1>This is a products page</h1>
    <a class="button is-light" v-if="isLoggedIn" v-on:click="showAddProductModal()">Add a New Product</a>
    <AddNewProduct v-bind:is-showing="showAddProduct" v-on:success="successAddProduct()" v-on:cancel="cancelAddProduct()"/>
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
    if (this.$store.state.userToken) {
      axios.get(APIConfig.buildUrl("/products"), {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response) => {
          this.items = response.data;
      });
    }
  }

  showAddProductModal() {
      this.showAddProduct = true;
  }

  successAddProduct() {
    this.showAddProduct = false;
    // this.getItems();
  }
  cancelAddProduct() {
    this.showAddProduct = false;
    // this.getItems();
  }

  mounted() {
    this.getItems();
  }
}

</script>