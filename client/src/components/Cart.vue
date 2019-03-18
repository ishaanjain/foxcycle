<template>
  <modal
    v-bind:is-showing="true"
    title="Your Cart"
    success-button="Check Out"
    v-on:success="success"
    v-on:cancel="cancel"
  >
    <p v-if="productsOrders.length == 0">Your cart is empty, please add some items to the cart</p>
    <table class="table is-striped is-fullwidth" v-show="productOrders.length">
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Quantity</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in productOrders" v-bind:key="index">
          <td>{{ p.name }}<img style="height:15%" :src="p.image"></td>
          <td>${{ p.price }}</td>
          <td>{{ p.quantity }}</td>
        </tr>
        <tr>
          <td>
            <b>Total:</b>
          </td>
          <td></td>
          <td>
            <b>${{total}}</b>
          </td>
        </tr>
      </tbody>
    </table>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iProductOrder } from "@/models/productOrder.interface";

@Component({
  components: { Modal }
})
export default class Cart extends Vue {
  error: string | boolean = false;
  public total: number = 0;

  get productOrders(): iProductOrder[] {
    return this.$store.state.productOrders;
  }

  mounted() {
    this.$store.state.productOrders.forEach((i: iProductOrder) => {
      this.total += i.price;
    });
  }

  success() {
    this.$emit("success");
  }

  cancel() {
    this.$emit("cancel");
  }
}
</script>

<style lang="scss">
#product-preview-image {
  height: 100px;
}
</style>
