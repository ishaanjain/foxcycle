<template>
  <div id="parent-services-container" class="services tile">
    <div class="title">
      <p class="subtitle">All Services are performed in store</p>
      <div>
        <a
          class="button is-light"
          v-if="isLoggedIn"
          v-on:click="showAddServiceModal()"
        >Add a New Service</a>
      </div>
      <div class="service-container">
        <div class="p-parent">
          <div v-for="(item, index) in items" v-bind:key="index">
            <router-link :to="{name: 'service detail', params: { id: item.id.toString() }}">
              <div class="box service">
                <h1 class="service-title title is-3">{{item.name.substr(0, 32)}}</h1>
                <p class="service-title item-price is-5">${{item.price}}</p>
                <p class="service-description title is-5">{{item.description.substr(0, 220)}}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <AddNewService
      v-bind:is-showing="showAddService"
      v-on:success="successAddService()"
      v-on:cancel="cancelAddService()"
    />
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import App from "@/App.vue";
import AddNewService from "@/components/AddNewService.vue";
import { APIConfig } from "../utils/api.utils";
import { iService } from "@/models/service.interface";
import { debug } from "util";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    App,
    AddNewService
  }
})
export default class Services extends Vue {
  public items: iService[] = [];
  public showAddService: boolean = false;

  @Prop(String) id!: string;

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  getItems() {
    axios
      .get(APIConfig.buildUrl("/services"), {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then(response => {
        this.items = response.data.services;
      });
  }

  showAddServiceModal() {
    this.showAddService = true;
  }

  successAddService() {
    this.showAddService = false;
    this.getItems();
  }
  cancelAddService() {
    this.showAddService = false;
  }

  mounted() {
    this.getItems();
  }
}
</script>

<style scoped lang="scss">

div.services {
  width: 1550px;
}

div.title {
  width: 1550px;
}

#parent-services-container {
  max-width: 1550px;
  width: auto;
  margin-left: 20px;
  margin-right: 0px;
}

.services {
  margin: 2%;
}
h1.service-title {
  height: 20px;
  margin-bottom: 18px;
}

h1.service-description {
  height: 10px;
  margin-bottom: 0px;
}

img.service {
  height: 76%;
  margin: 0px 0px 16px 0px;
}

.service:hover {
  cursor: pointer;
}

.service {
  height: 300px;
  width: 350px;
  float: left;
  margin: 14px;
}

.p-parent {
  width: 100%;
}

.item-price {
  text-align: right;
}

</style>