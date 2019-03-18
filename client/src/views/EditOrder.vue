<template>
  <modal
    v-bind:is-showing="true"
    title="Edit Order"
    success-button="Save"
    v-on:success="success"
    v-on:cancel="cancel"
  >
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">{{ error }}</p>
      <div class="field">
        <label class="label">Order Name:</label>
        <div class="control">
          <input class="input" type="text" placeholder="Order name" v-model="order.name">
        </div>
      </div>
      <div class="field">
        <label class="label">Description:</label>
        <div class="control">
          <textarea
            class="input textarea"
            type="textarea"
            placeholder="order description"
            v-model="order.description"
          ></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Price:</label>
        <div class="control">
          <input class="input" type="text" placeholder="Price" v-model="order.price">
        </div>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "../components/Modal.vue";
import { iOrder } from "@/models/order.interface";

@Component({
  components: { Modal }
})
export default class EditOrder extends Vue {
  @Prop() order!: iOrder;
  error: string | boolean = false;

  success() {
    this.error = false;
    axios
      .patch(APIConfig.buildUrl(`/orders/${this.order.id}`), this.order, {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response: AxiosResponse<iOrder>) => {
        this.$emit("success");
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