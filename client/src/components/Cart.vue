<template>
  <modal
    v-bind:is-showing="true"
    title="Your Cart"
    success-button="Check Out"
    v-on:success="success"
    v-on:cancel="cancel"
  >
    <table class="table is-striped is-fullwidth" v-show="items.length">
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Quantity</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in items" v-bind:key="index">
          <td>{{ p.name }}</td>
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

  get items(): iProductOrder[] {
    return this.$store.state.items;
  }

  mounted() {
    this.$store.state.items.forEach((i: iProductOrder) => {
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