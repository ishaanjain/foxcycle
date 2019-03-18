<template>
  <div class="orders">
    <div>{{error}}</div>
    <div id="ordersInputs">
      <input
        class="input ordersInput"
        type="number"
        placeholder="ID"
        :value="filter.id"
        @input="filterChange"
        name="id"
      >
      <input
        class="input ordersInput"
        type="text"
        placeholder="Customer Name"
        :value="filter.name"
        @input="filterChange"
        name="name"
      >
      <input
        class="input ordersInput"
        type="text"
        placeholder="Customer Adress"
        :value="filter.address"
        @input="filterChange"
        name="address"
      >
      <input
        class="input ordersInput"
        type="number"
        placeholder="Credit Card #"
        :value="filter.creditCard"
        @input="filterChange"
        name="creditCard"
      >
    </div>
    <table class="table is-striped is-fullwidth">
      <tr>
        <th>ID</th>
        <th>Total Price</th>
        <th>In-Store Pickup</th>
        <th>Customer Name</th>
        <th>Customer Address</th>
        <th>Credit Card #</th>
        <th>Status</th>
      </tr>
      <tr v-for="(order, index) in myOrders" v-bind:key="index">
        <th>{{order.id}}</th>
        <th>{{order.totalPrice}}</th>
        <th>{{order.storePickup}}</th>
        <th>{{order.name}}</th>
        <th>{{order.address}}</th>
        <th>{{order.creditCard}}</th>
        <th>{{order.status}}</th>
        <th>
          <button class="button" v-on:click="deleteOrder(order.id)">
            <span class="icon">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </th>
      </tr>
    </table>
    <Modal
      v-bind:is-showing="showConfirm"
      title="Confirmation"
      success-button="Delete"
      v-on:success="confirmDelete"
      v-on:cancel="confirmCancel"
    >
      <div>Are you sure you want to delete this order?</div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component } from "vue-property-decorator";
import { iOrder } from "@/models/order.interface";
import Modal from "../components/Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class Orders extends Vue {
  filter: iOrderFilter = {
    id: undefined,
    name: "",
    address: "",
    creditCard: "",
  };
  myOrders: iOrder[] = [];
  public showConfirm: boolean = false;
  pendingDeleteOrderId: number = -1;
  error: string = "";

  filterChange(event: any) {
    this.filter[event.target.name] = event.target.value;
    this.loadOrders();
  }

  loadOrders() {
    axios
      .get(APIConfig.buildUrl("/orders"), {
        headers: { token: this.$store.state.userToken },
        params: this.filter
      })
      .then((response: AxiosResponse) => {
        this.myOrders = response.data.orders;
      })
      .catch((error: any) => {
        console.log(error.response.data);
        this.error = error.response.data.reason;
      });
  }

  mounted() {
    if (!this.$store.state.user) {
      this.$router.push({ name: "home" });
    }
    this.loadOrders();
  }

  deleteOrder(id: number) {
    this.showConfirm = true;
    this.pendingDeleteOrderId = id;
  }

  confirmDelete() {
    axios
      .delete(APIConfig.buildUrl(`/orders/${this.pendingDeleteOrderId}`), {
        headers: { token: this.$store.state.userToken }
      })
      .then((response: AxiosResponse) => {
        this.loadOrders();
        this.showConfirm = false;
        this.pendingDeleteOrderId = -1;
      })
      .catch((error: any) => {
        console.log(error.response.data);
        this.error = error.response.data.reason;
      });
  }

  confirmCancel() {
    this.showConfirm = false;
    this.pendingDeleteOrderId = -1;
  }

  editOrder(event: any) {
    event.preventDefault();
    const order = this.myOrders.find(
      (order: iOrder) => order.id == event.target.id
    );
    if (!order) return;
    axios
      .patch(
        APIConfig.buildUrl(`/orders/${event.target.id}`),
        {
          status: "dispatched"
        },
        {
          headers: { token: this.$store.state.userToken }
        }
      )
      .then((response: AxiosResponse) => {
        // order.isAdmin = response.data.user.isAdmin;
      })
      .catch((error: any) => {
        console.log(error.response.data);
        this.error = error.response.data.reason;
      });
  }
}

interface iOrderFilter {
  [key: string]: any;
  id: number | undefined;
  name: string;
  address: string;
  creditCard: string;
}
</script>

<style scoped>
@import "~bulma/css/bulma.css";

#ordersInputs {
  margin: 20px 0px 15px 0px;
  display: flex;
}

.ordersInput {
  margin: 0px 10px 0px 10px;
}
</style>