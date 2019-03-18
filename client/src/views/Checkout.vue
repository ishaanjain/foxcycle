<template>
  <div class="checkout">
    <p class="title is-3" v-if="productOrders.length != 0">Complete Order</p>
    <h1 class="title is-3 has-text-centered" v-if="productOrders.length == 0">You have no items to checkout with.</h1>
    <div v-if="productOrders.length > 0" class="columns">
      <div class="column is-half">
        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Number</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in productOrders" v-bind:key="index">
              <td>
                {{item.name}}
                <img style="height:15%" :src="item.image">
              </td>
           
              <td>{{item.quantity}}</td>
              <td>${{item.price}}</td>
            </tr>
          </tbody>
        </table>
        <p class="subtitle">Total: ${{total}}</p>
      </div>
      <div class="column is-half">
        <div>
          <b-field label="Name">
            <b-input type="search" maxlength="30" v-model="name"></b-input>
          </b-field>
          <b-field label="Address">
            <b-input type="search" maxlength="60" v-model="address"></b-input>
          </b-field>
          <b-field label="Credit Card Number">
            <b-input type="search" maxlength="30" v-model="ccNum"></b-input>
          </b-field>
          <label id="orderPickupLabel" class="checkbox">
          <input type="checkbox" v-bind="storePickup">
          Pick Up Order In Store
          </label>

          <p class="control">
            <a class="button is-primary" v-on:click="checkout">Order</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProductOrder } from "../models/productOrder.interface";
import { iOrder } from "../models/order.interface";

@Component
export default class Checkout extends Vue {
  public productOrders = this.$store.state.productOrders;
  public total = 0;
  public name: string = "";
  public address: string = "";
  public ccNum: string = "";
  public storePickup: boolean = false;

  mounted() {
    this.orderTotal();
  }

  orderTotal() {
    this.$store.state.productOrders.forEach((i: iProductOrder) => {
      this.total += i.price;
    });
  }

  checkout() {
    var oneItemHasToBePickedUpInStore = false;
    this.productOrders.forEach((i: iProductOrder) => {
      if (i.inStoreOnly) {
        oneItemHasToBePickedUpInStore = true;
      }
    });

    if (oneItemHasToBePickedUpInStore && !this.storePickup) {
      this.$toast.open({
        message: "One Item Must Be Picked Up In Store",
        position: "is-bottom",
        type: "is-danger"
      });
    }
    else {
      var currentOrder: iOrder = {
        id: 1,
        productOrders: this.productOrders,
        totalPrice: this.total,
        storePickup: false,
        name: this.name,
        address: this.address,
        creditCard: this.ccNum,
        status: ""
      };
      axios
        .post(APIConfig.buildUrl("/orders"), currentOrder, {
          headers: {
            token: this.$store.state.userToken
          }
        })
        .then((response: AxiosResponse<iOrder>) => {
          this.$store.state.productOrders = [];
          this.$router.push({ name: "success" });
        })
        .catch((reason: any) => {
          console.error(reason.message);
        });
    }
  }
}
</script>

<style scoped lang="scss">
.checkout {
  margin-top: 20px;
}

#orderPickupLabel {
  margin-bottom: 40px;
}
</style>
