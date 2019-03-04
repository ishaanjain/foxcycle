<template>
  <div class="products">
    <a class="button is-light" v-if="isLoggedIn" v-on:click="showEditProductModal()">Edit this Product</a>
    <a class="button is-light" v-if="isLoggedIn" v-on:click="showDeleteProductModal()">Delete this Product</a>
    <EditProduct v-bind:product="item" v-bind:is-showing="showEditProduct" v-on:success="successEditProduct()" v-on:cancel="cancelEditProduct()"/>
    <DeleteProduct v-bind:product="item" v-bind:is-showing="showDeleteProduct" v-on:success="successDeleteProduct()" v-on:cancel="cancelDeleteProduct()"/>
    <div class="container products-container">
      <div class="tile is-ancestor">
          
          <div class="tile is-child box product">
            <h2>{{this.item.name}}</h2>
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
import EditProduct from "@/components/EditProduct.vue"
import DeleteProduct from "@/components/DeleteProduct.vue"
import { APIConfig } from "../utils/api.utils";
import { Product } from "../../../api/entity";

@Component({
  components: {
    App, EditProduct, DeleteProduct
  }
})
export default class ProductDetail extends Vue {
  public showEditProduct: boolean = false;
  public showDeleteProduct: boolean = false;
  public item: Product = {
    id : 0,
    name : "",
    description : "",
    price : 0,
    imageUrls : "",
    stockCount : 0,
    tags : [],
    inStoreOnly : false
  };
  
  @Prop(String) id!: string;

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

  showEditProductModal() {
      this.showEditProduct = true;
  }

  successEditProduct() {
    this.showEditProduct = false;
  }

  cancelEditProduct() {
    this.showEditProduct = false;
  }

  showDeleteProductModal() {
      this.showDeleteProduct = true;
  }

  successDeleteProduct() {
    this.showDeleteProduct = false;
    this.$router.push({ name: "products" });
  }

  cancelDeleteProduct() {
    this.showDeleteProduct = false;
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