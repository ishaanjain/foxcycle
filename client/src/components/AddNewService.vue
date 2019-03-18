<template>
  <modal v-bind:is-showing="isShowing" title="Add Service" success-button="Add" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">Service Name:</label>
        <div class="control">
          <input class="input" type="text" placeholder="Service name" v-model="service.name">
        </div>
      </div>
      <div class="field">
        <label class="label">Description:</label>
        <div class="control">
          <textarea class="input textarea" type="textarea" placeholder="Service description" v-model="service.description"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Price:</label>
        <div class="control">
          <input class="input" type="text" placeholder="Price" v-model="service.price">
        </div>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iService } from '@/models/service.interface';

@Component({
  components: { Modal }
})
export default class AddNewService extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  service: iService = {
    id: 0,
    name: "",
    description: "",
    price: 0
  };
  error: string | boolean = false;
  success() {
    this.error = false;
    axios
      .post(APIConfig.buildUrl("/services"), this.service, {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response: AxiosResponse<iService>) => {
        this.$emit("success");
        this.service =  {
          id: 0,
          name: "",
          description: "",
          price: 0.0
        };
      })
      .catch((reason: any) => {
        this.error = reason.message;
      });
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