<template>
  <div class="product-detail">
    <div class="columns">
      <div class="column is-two-fifths">
        <h3 class="title is-3">Service Details:</h3>
      </div>
      <div class="column is-three-fifths">
        <a
          class="button is-light edit-product"
          v-if="isLoggedIn"
          v-on:click="showEditServiceModal()"
        >Edit this Service</a>
        <a
          class="button is-light"
          v-if="isLoggedIn"
          v-on:click="showDeleteServiceModal()"
        >Delete this Service</a>
      </div>
    </div>
    <div class="product-detail">
      <EditService
        v-bind:service="item"
        v-bind:is-showing="showEditService"
        v-on:success="successEditService()"
        v-on:cancel="cancelEditService()"
      />
      <DeleteService
        v-bind:service="item"
        v-bind:is-showing="showDeleteService"
        v-on:success="successDeleteService()"
        v-on:cancel="cancelDeleteService()"
      />
      <div class="columns">
        <div class="column is-three-fifths">
          <div class="product-field product-name">
            <h5 class="title is-4">Service name:</h5>
            <h2>{{this.item.name}}</h2>
          </div>
          <div class="product-field product-description">
            <h5 class="title is-4">Service description:</h5>
            <h2>{{this.item.description}}</h2>
          </div>
          <div class="product-field product-price">
            <h5 class="title is-4">Price:</h5>
            <h1 class="title is-5">${{this.item.price}}</h1>
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
import EditService from "@/components/EditService.vue";
import DeleteService from "@/components/DeleteService.vue";
import { APIConfig } from "../utils/api.utils";
import { iService } from "../models/service.interface";
import { debug } from "util";

@Component({
  components: {
    App,
    EditService,
    DeleteService
  }
})
export default class ServiceDetail extends Vue {
  public showEditService: boolean = false;
  public showDeleteService: boolean = false;

  public item: iService = {
    id: 0,
    name: "",
    description: "",
    price: 0
  };

  public tempService: iService = {
    id: 0,
    name: "",
    description: "",
    price: 0
  };

  @Prop(String) id!: string;

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  getService() {
    axios
      .get(APIConfig.buildUrl(`/services/${this.id}`), {
        params: {
          id: this.id
        }
      })
      .then(response => {
        this.item = response.data.service;
        this.tempService.id = this.item.id;
        this.tempService.name = this.item.name;
        this.tempService.description = this.item.description;
        this.tempService.price = this.item.price;
      });
  }

  showEditServiceModal() {
    this.showEditService = true;
  }

  successEditService() {
    this.showEditService = false;
  }

  cancelEditService() {
    this.showEditService = false;
    this.item.id = this.tempService.id;
    this.item.name = this.tempService.name;
    this.item.description = this.tempService.description;
    this.item.price = this.tempService.price;
  }

  showDeleteServiceModal() {
    this.showDeleteService = true;
  }

  successDeleteService() {
    this.showDeleteService = false;
    this.$router.push({ name: "service" });
  }

  cancelDeleteService() {
    this.showDeleteService = false;
  }

  mounted() {
    this.getService();
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
</style>