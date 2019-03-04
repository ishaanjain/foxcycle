<template>
  <div class="product-detail">
    <div class="columns">
      <div class="column is-two-fifths">
        <h3 class="title is-3">Product Details:</h3>
      </div>
      <div class="column is-three-fifths">
        <a class="button is-light edit-product" v-if="isLoggedIn" v-on:click="showEditProductModal()">Edit this Product</a>
        <a class="button is-light" v-if="isLoggedIn" v-on:click="showDeleteProductModal()">Delete this Product</a>  
      </div>
    </div>
    <div class="product-detail">
      <EditProduct v-bind:product="item" v-bind:is-showing="showEditProduct" v-on:success="successEditProduct()" v-on:cancel="cancelEditProduct()"/>
      <DeleteProduct v-bind:product="item" v-bind:is-showing="showDeleteProduct" v-on:success="successDeleteProduct()" v-on:cancel="cancelDeleteProduct()"/>
      <div class="columns">
        <div class="column is-two-fifths">
          <img class="product-img" :src="this.item.imageUrls">
        </div>
        <div class="column is-three-fifths">
          <div class="product-field product-name">
            <h5 class="title is-5">Product name:</h5>
            <h2>{{this.item.name}}</h2>
          </div>
          <div class="product-field product-description">
            <h5 class="title is-5">Product description:</h5>
            <h2>{{this.item.description}}</h2>
          </div>
          <div class="product-field product-price">
            <h5 class="title is-5">Price:</h5>
            <h2>${{this.item.price}}</h2>
          </div>
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

.edit-product {
  margin-right: 14px;
}

.product-field {
  margin-bottom: 40px;
}

</style>