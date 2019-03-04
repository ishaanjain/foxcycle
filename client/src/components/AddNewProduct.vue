<template>
  <modal v-bind:is-showing="isShowing" title="Add Product" success-button="Add" v-on:success="success" v-on:cancel="cancel">
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
      <span>
        <img id="product-preview-image" :src="product.imageUrls"/>
      </span>
      <div class="field">
        <label class="label">Stock/Inventory Count:</label>
        <div class="control">
          <input class="input" type="text" placeholder="stock/inventory count" v-model="product.stockCount">
        </div>
      </div>
      <div class="field">
        <label class="label">Item Categories/Tags: (separated by ";")</label>
        <label class="label">ex: brand:Willier;color:Orange;size:Medium;type:Road</label>
        <div class="control">
          <input class="input" type="text" placeholder="product categories/tags" v-model="product.tags">
        </div>
      </div>
      <label class="checkbox">
        <input type="checkbox" v-bind:checked="product.inStoreOnly">
            In Store Only
        </label>
    </form>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iProduct } from "@/models/product.interface";
@Component({
  components: { Modal }
})
export default class AddNewProduct extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  product: iProduct = {
    name: "",
    description: "",
    price: 0.0,
    imageUrls: "",
    stockCount: 0,
    tags: "",
    inStoreOnly: false
  };
  error: string | boolean = false;
  success() {
    this.error = false;
    axios
      .post(APIConfig.buildUrl("/products"), this.product, {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response: AxiosResponse<iProduct>) => {
        this.$emit("success");
        this.product =  {
          name: "",
          description: "",
          price: 0.0,
          imageUrls: "",
          stockCount: 0,
          tags: "",
          inStoreOnly: false
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