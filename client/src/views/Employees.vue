<template>
  <div class="employees">
    <div>{{error}}</div>
    <div id="employeesInputs">
      <input 
        class="input employeesInput" 
        type="number"
        placeholder="ID"
        :value="filter.id"
        @input="filterChange"
        name="id"
      />
      <input 
        class="input employeesInput" 
        type="text"
        placeholder="First Name"
        :value="filter.firstName"
        @input="filterChange"
        name="firstName"
      />
      <input 
        class="input employeesInput" 
        type="text"
        placeholder="Last Name"
        :value="filter.lastName"
        @input="filterChange"
        name="lastName"
      />
      <input
        class="input employeesInput" 
        type="email"
        placeholder="Email Address"
        :value="filter.emailAddress"
        @input="filterChange"
        name="emailAddress"
      />
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
    <Modal 
      v-bind:is-showing="showConfirm" 
      title="Confirmation" 
      success-button="Delete" 
      v-on:success="confirmDelete" 
      v-on:cancel="confirmCancel">
      <div>Are you sure you want to delete this employee?</div>
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
export default class Employees extends Vue {
  filter: EmployeeFilter = {
    id: undefined,
    firstName: "",
    lastName: "",
    emailAddress: ""
  };
  employee: Employee = {
    id: undefined,
    firstName: "",
    lastName: "",
    emailAddress: "",
    isAdmin: false
  };
  myEmployees: Employee[] = [];
  public showSignup: boolean = false;
  public showConfirm: boolean = false;
  pendingDeleteEmployeeId: number = -1;
  error: string = "";
  
  filterChange(event: any) {
    this.filter[event.target.name] = event.target.value;
    this.loadEmployees();
  }

  loadEmployees() {
    axios.get(APIConfig.buildUrl("/users"), {
      headers: { token: this.$store.state.userToken },
      params: this.filter
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
    this.showConfirm = true;
    this.pendingDeleteEmployeeId = id;
  }

  confirmDelete() {
    this.showConfirm = false;
    if (this.pendingDeleteEmployeeId === this.$store.state.user.id) {
      alert("Trying to delete yourself? Probably not a good idea.")
      return;
    }
    axios.delete(APIConfig.buildUrl(`/users/${this.pendingDeleteEmployeeId}`), {
      headers: { token: this.$store.state.userToken }
    }).then((response: AxiosResponse) => {
      this.loadEmployees();
    }).catch((error: any) => {
      console.log(error.response.data);
      this.error = error.response.data.reason;
    });
  }

  confirmCancel() {
    this.showConfirm = false;
    this.pendingDeleteEmployeeId = -1;
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

interface EmployeeFilter {
  [key: string]: any;
  id: number | undefined;
  firstName: string;
  lastName: string;
  emailAddress: string;
}
</script>

<style scoped>

@import "~bulma/css/bulma.css";

#employeesInputs {
  margin: 20px 0px 15px 0px;
  display: flex;
}

.employeesInput {
  margin: 0px 10px 0px 10px;
}

</style>