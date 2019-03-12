<template>
  <modal v-bind:is-showing="isShowing" title="Delete Product" success-button="Delete" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">Are you sure you want to delete this product? There's no going back...</label>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iProduct } from "../models/product.interface";
@Component({
  components: { Modal }
})
export default class DeleteProduct extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  @Prop() product!: iProduct;
  error: string | boolean = false;
  success() {
    this.error = false;
    axios
      .delete(APIConfig.buildUrl(`/products/${this.product.id}`), {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response: AxiosResponse<iProduct>) => {
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