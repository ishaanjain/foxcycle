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
        placeholder="First Name"
        :value="filter.firstName"
        @input="filterChange"
        name="firstName"
      >
      <input
        class="input ordersInput"
        type="text"
        placeholder="Last Name"
        :value="filter.lastName"
        @input="filterChange"
        name="lastName"
      >
      <input
        class="input ordersInput"
        type="email"
        placeholder="Email Address"
        :value="filter.emailAddress"
        @input="filterChange"
        name="emailAddress"
      >
    </div>
    <table class="table is-striped is-fullwidth">
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email Address</th>
        <th>Admin</th>
        <th></th>
      </tr>
      <tr v-for="(order, index) in myOrders" v-bind:key="index">
        <th>{{order.id}}</th>
        <th>{{order.firstName}}</th>
        <th>{{order.lastName}}</th>
        <th>{{order.emailAddress}}</th>
        <th>
          <input
            type="checkbox"
            :id="order.id"
            :checked="order.isAdmin"
            v-on:click="editOrder"
          >
        </th>
        <th>
          <button class="button" v-on:click="deleteOrder(order.id)">
            <span class="icon">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </th>
      </tr>
    </table>
    <div class="buttons">
      <button class="button is-primary" v-on:click="showSignup = true">
        <strong>Add order</strong>
      </button>
    </div>
    <Signup v-if="showSignup" v-on:success="signupSuccess" v-on:cancel="showSignup = false"/>
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
import Modal from "../components/Modal.vue";
import Signup from "../components/Signup.vue";

@Component({
  components: {
    Signup,
    Modal
  }
})
export default class Orders extends Vue {
  filter: OrderFilter = {
    id: undefined,
    firstName: "",
    lastName: "",
    emailAddress: ""
  };
  order: Order = {
    id: undefined,
    firstName: "",
    lastName: "",
    emailAddress: "",
    isAdmin: false
  };
  myOrders: Order[] = [];
  public showSignup: boolean = false;
  public showConfirm: boolean = false;
  pendingDeleteOrderId: number = -1;
  error: string = "";

  filterChange(event: any) {
    this.filter[event.target.name] = event.target.value;
    this.loadOrders();
  }

  loadOrders() {
    axios
      .get(APIConfig.buildUrl("/users"), {
        headers: { token: this.$store.state.userToken },
        params: this.filter
      })
      .then((response: AxiosResponse) => {
        this.myOrders = response.data.users;
      })
      .catch((error: any) => {
        console.log(error.response.data);
        this.error = error.response.data.reason;
      });
  }

  mounted() {
    if (!this.$store.state.isAdmin) {
      this.$router.push({ name: "home" });
    }
    this.loadOrders();
  }

  signupSuccess() {
    this.showSignup = false;
    this.loadOrders();
  }

  deleteOrder(id: number) {
    this.showConfirm = true;
    this.pendingDeleteOrderId = id;
  }

  confirmDelete() {
    this.showConfirm = false;
    if (this.pendingDeleteOrderId === this.$store.state.user.id) {
      alert("Trying to delete yourself? Probably not a good idea.");
      return;
    }
    axios
      .delete(APIConfig.buildUrl(`/users/${this.pendingDeleteOrderId}`), {
        headers: { token: this.$store.state.userToken }
      })
      .then((response: AxiosResponse) => {
        this.loadOrders();
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
    if (parseInt(event.target.id, 10) === this.$store.state.user.id) {
      alert("Trying to demote yourself? Probably not a good idea.");
      return;
    }
    const order = this.myOrders.find(
      (order: Order) => order.id == event.target.id
    );
    if (!order) return;
    axios
      .patch(
        APIConfig.buildUrl(`/users/${event.target.id}`),
        {
          isAdmin: !order.isAdmin
        },
        {
          headers: { token: this.$store.state.userToken }
        }
      )
      .then((response: AxiosResponse) => {
        order.isAdmin = response.data.user.isAdmin;
      })
      .catch((error: any) => {
        console.log(error.response.data);
        this.error = error.response.data.reason;
      });
  }
}

interface Order {
  id: number | undefined;
  firstName: string;
  lastName: string;
  emailAddress: string;
  isAdmin: boolean;
}

interface OrderFilter {
  [key: string]: any;
  id: number | undefined;
  firstName: string;
  lastName: string;
  emailAddress: string;
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