<template>
  <div class="checkout">
    <p class="is-size-1 has-text-centered"> Successfully Ordered! </p>
    <figure class="image" >
        <img src="https://media.giphy.com/media/xUOxeZn47mrdabqDNC/giphy.gif">
    </figure>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProductOrder } from "../models/productOrder.interface";

@Component
export default class Success extends Vue {

}
</script>

<style scoped lang="scss">
.checkout {
  margin-top: 20px;
}
</style>
