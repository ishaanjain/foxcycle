<template>
  <div>
    <b-field label="Tracking Number">
      <b-input type="number" v-model="number" min="1" max="100" step="1"></b-input>
    </b-field>
    <a class="button is-primary" v-on:click="search">Track</a>
    <div class="columns is-two-thirds" v-bind:class="{ 'is-hidden': !searched}" style="text-align: left; margin: 10px;">
      <div class="column ">
        <!-- <img class="product-img" :src="this.item.imageUrls"> -->
        <p class="title">Order Number: {{order.id}}</p>
        <p class="subtitle">Status: {{order.status}}</p>
        <table class="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.products" v-bind:key="index">
              <td><p class="is-size-2">{{item.productCount}}</p></td>
              <td>
                {{item.product.name}}
                <img style="display: block; height:200px" :src="item.product.imageUrls">
              </td>
            </tr>
          </tbody>
        </table>
        <p class="subtitle">To: {{order.name}}</p>
        <p class="title">Total Cost: ${{order.totalPrice}}</p>
        <p class="title" v-bind:class="{ 'is-hidden': order.storePickup}">Delivery to: {{order.address}}</p>
        <p class="title" v-bind:class="{ 'is-hidden': !order.storePickup}">Store Pick Up Only</p>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iOrder } from "../models/order.interface";

@Component
export default class Tracking extends Vue {
  public number = 0;
  public searched = false;

  search() {
    axios
      .get(APIConfig.buildUrl(`/orders/${this.number}`), {
        params: {
          id: this.number
        }
      })
      .then(response => {
        this.searched = true;
        this.order.id = response.data.order.id;
        this.order.status = response.data.order.status;
        this.order.totalPrice = response.data.order.totalPrice;
        this.order.name = response.data.order.name;
        this.order.storePickup = response.data.order.storePickup;
        this.order.address = response.data.order.address;
        this.order.products = response.data.order.productOrders;
      })
      .catch(() => {
        this.errorwarning();
        this.searched = false;
      });
  }

  errorwarning() {
    this.$toast.open({
      message: `Could not find Order`,
      position: "is-bottom",
      type: "is-danger"
    });
  }

  public order: iOrder = {
    id: 0,
    status: "",
    totalPrice: 0,
    storePickup: false,
    address: "",
    name: "",
    products:[]
  };
}
</script>

<style scoped lang="scss">
</style>