<template>
  <modal v-bind:is-showing="isShowing" title="Edit Product" success-button="Save" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">Product Name:</label>
        <div class="control">
          <input class="input" type="text" placeholder="product name" v-model="product.name">
        </div>
      </div>
      <div class="field">
        <label class="label">Description:</label>
        <div class="control">
          <textarea class="input" type="" placeholder="product description" v-model="product.description"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Price:</label>
        <div class="control">
          <input class="input" type="text" placeholder="email address" v-model="product.price">
        </div>
      </div>
      <div class="field">
        <label class="label">Image Url(s):</label>
        <div class="control">
          <input class="input" type="text" placeholder="product image url" v-model="product.imageUrls">
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
import { Product } from "../../../api/entity";
@Component({
  components: { Modal }
})
export default class Cart extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  @Prop() product!: Product;
  error: string | boolean = false;
  success() {
    this.error = false;
    axios
      .put(APIConfig.buildUrl(`/products/${this.product.id}`), this.product, {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response: AxiosResponse<Product>) => {
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