<template>
  <div class="product-detail">
    <div class="columns">
      <div class="column is-two-fifths">
        <h3 class="title is-3">Product Details:</h3>
      </div>
      <div class="column is-three-fifths">
        <a
          class="button is-light edit-product"
          v-if="isLoggedIn"
          v-on:click="showEditProductModal()"
        >Edit this Product</a>
        <a
          class="button is-light"
          v-if="isLoggedIn"
          v-on:click="showDeleteProductModal()"
        >Delete this Product</a>
      </div>
    </div>
    <div class="product-detail">
      <EditProduct
        v-bind:product="item"
        v-if="showEditProduct"
        v-on:success="successEditProduct()"
        v-on:cancel="cancelEditProduct()"
      />
      <DeleteProduct
        v-bind:product="item"
        v-bind:is-showing="showDeleteProduct"
        v-on:success="successDeleteProduct()"
        v-on:cancel="cancelDeleteProduct()"
      />
      <div class="columns">
        <div class="column is-two-fifths">
          <img class="product-img" :src="this.item.imageUrls">
          <div class="product-quantity-container">
            <div class="product-quantity field has-addons">
              <div class="control">
                <input
                  class="input product-quantity"
                  type="number"
                  placeholder="Quantity"
                  v-model="itemQuantity"
                  min="1"
                >
              </div>
              <div class="control">
                <a class="button is-primary" v-on:click="addProductToCart()">Add To Cart!</a>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-three-fifths">
          <div class="product-field product-name">
            <h5 class="title is-4">Product name:</h5>
            <h2>{{this.item.name}}</h2>
          </div>
          <div class="product-field product-description">
            <h5 class="title is-4">Product description:</h5>
            <h2>{{this.item.description}}</h2>
          </div>
          <div class="product-field product-price">
            <h5 class="title is-4">Price:</h5>
            <h1 class="title is-5">${{this.item.price}}</h1>
          </div>
          <div class="product-field">
            <h1
              class="title is-5 product-instore-only"
              v-if="item.inStoreOnly"
            >In Store Only! Please come in to our shop to purchase</h1>
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
import EditProduct from "@/components/EditProduct.vue";
import DeleteProduct from "@/components/DeleteProduct.vue";
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "../models/product.interface";
import { iTag } from "../models/tag.interface";
import { iProductOrder } from "../models/productOrder.interface";

@Component({
  components: {
    App,
    EditProduct,
    DeleteProduct
  }
})
export default class ProductDetail extends Vue {
  public showEditProduct: boolean = false;
  public showDeleteProduct: boolean = false;
  public itemQuantity: number = 1;
  public item: iProduct = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrls: "",
    stockCount: 0,
    tagString: "",
    tags: [],
    inStoreOnly: false
  };

  @Prop(String) id!: string;

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  mounted() {
    this.getProduct();
  }

  getProduct() {
    axios
      .get(APIConfig.buildUrl(`/products/${this.id}`), {
        params: {
          id: this.id
        }
      })
      .then(response => {
        this.item = response.data.product;
      });
  }

  showEditProductModal() {
    this.showEditProduct = true;
  }

  successEditProduct() {
    this.showEditProduct = false;
    this.getProduct();
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

  addProductToCart() {
    var productOrders: iProductOrder[] = this.$store.state.productOrders;
    for (var i in productOrders) {
      if (productOrders[i].productId == this.item.id) {
        if (this.itemQuantity > this.item.stockCount - productOrders[i].productCount) {
          this.$toast.open({
            message: "Not enough stock for quantity being added",
            position: "is-bottom",
            type: "is-danger"
          });
          console.log(
            "out of stock for addition to orderItems" + this.itemQuantity
          );
          return false;
        } else {
          this.$store.commit("updateCart", {
            productId: productOrders[i].productId,
            additionalQuantity: this.itemQuantity
          });
          this.$toast.open({
            message: `${
              this.itemQuantity
            } items successfully added to the cart!`,
            position: "is-bottom",
            type: "is-success"
          });
          return true;
        }
      }
    }
    if (this.itemQuantity > this.item.stockCount) {
      this.$toast.open({
        message: "Not enough stock for quantity being added",
        position: "is-bottom",
        type: "is-danger"
      });
      console.log("out of stock" + this.itemQuantity);
      return false;
    } else {
      var orderItem: iProductOrder = {
        productId: this.item.id,
        productCount: this.itemQuantity,
        name: this.item.name,
        price: this.item.price * this.itemQuantity,
        image: this.item.imageUrls
      };
      this.$store.commit("addToCart", { orderItem });
      this.$toast.open({
        message: `${this.itemQuantity} items successfully added to the cart!`,
        position: "is-bottom",
        type: "is-success"
      });
      return true;
    }
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

.product-detail {
  margin-top: 20px;
}

input.product-quantity {
  width: 100px;
}

div.product-quantity.has-addons {
  display: inline-flex;
}

.product-quantity-container {
  text-align: center;
  padding-top: 50px;
}

.product-instore-only {
  color: red;
}
</style>