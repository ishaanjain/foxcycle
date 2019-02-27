<template>
  <div class="employees">
    <div>{{error}}</div>
    <table class="table is-striped is-fullwidth">
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email Address</th>
        <th>Admin</th>
        <th></th>
      </tr>
      <tr v-for="(employee, index) in myEmployees" v-bind:key="index">
        <th>{{employee.id}}</th>
        <th>{{employee.firstName}}</th>
        <th>{{employee.lastName}}</th>
        <th>{{employee.emailAddress}}</th>
        <th>
          <input 
            type="checkbox" 
            :id="employee.id"
            :checked="employee.isAdmin"
            v-on:click="editEmployee" 
          />
        </th>
        <th>
          <button class="button" v-on:click="deleteEmployee(employee.id)">
            <span class="icon"><i class="fas fa-trash"></i></span>
          </button>
        </th>
      </tr>
    </table>
    <div class="buttons">
      <button class="button is-primary" v-on:click="showSignup = true">
        <strong>Add employee</strong>
      </button>
    </div>
    <Signup
      v-if="showSignup"
      v-on:success="signupSuccess"
      v-on:cancel="showSignup = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component } from "vue-property-decorator";
import Signup from "../components/Signup.vue";

@Component({
  components: { Signup }
})
export default class Employees extends Vue {
  employee: Employee = {
    id: undefined,
    firstName: "",
    lastName: "",
    emailAddress: "",
    isAdmin: false
  };
  myEmployees: Employee[] = [];
  public showSignup: boolean = false;
  error: string = "";
  
  loadEmployees() {
    axios.get(APIConfig.buildUrl("/users"), {
      headers: { token: this.$store.state.userToken }
    }).then((response: AxiosResponse) => {
      this.myEmployees = response.data.users;
    }).catch((error: any) => {
      console.log(error.response.data);
      this.error = error.response.data.reason;
    });
  }

  mounted() {
    if (!this.$store.state.isAdmin) {
      this.$router.push({ name: "home" });
    }
    this.loadEmployees();
  }

  signupSuccess() {
    this.showSignup = false;
    this.loadEmployees();
  }

  deleteEmployee(id: number) {
    if (id === this.$store.state.user.id) {
      alert("Trying to delete yourself? Probably not a good idea.")
      return;
    }
    axios.delete(APIConfig.buildUrl(`/users/${id}`), {
      headers: { token: this.$store.state.userToken }
    }).then((response: AxiosResponse) => {
      this.loadEmployees();
    }).catch((error: any) => {
      console.log(error.response.data);
      this.error = error.response.data.reason;
    });
  }

  editEmployee(event: any) {
    event.preventDefault();
    if (parseInt(event.target.id, 10) === this.$store.state.user.id) {
      alert("Trying to demote yourself? Probably not a good idea.")
      return;
    }
    const employee = this.myEmployees.find((employee: Employee) => 
      employee.id == event.target.id);
    if (!employee) return;
    axios.patch(APIConfig.buildUrl(`/users/${event.target.id}`), {
      isAdmin: !employee.isAdmin
    }, {
      headers: { token: this.$store.state.userToken }
    }).then((response: AxiosResponse) => {
      employee.isAdmin = response.data.user.isAdmin;
    }).catch((error: any) => {
      console.log(error.response.data);
      this.error = error.response.data.reason;
    })
  }
}

interface Employee {
  id: number | undefined;
  firstName: string;
  lastName: string;
  emailAddress: string;
  isAdmin: boolean;
}
</script>

<style scoped>
table {
  margin-top: 15px;
}
</style>