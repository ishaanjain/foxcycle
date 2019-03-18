<template>
<div>
    <b-field label="Tracking Number">
        <b-input type="number" v-model="number" min="1"
        max="100" step ="1"></b-input>
    </b-field>
    <a class="button is-primary" v-on:click="search">Track</a>
    <div class="columns" v-bind:class="{ 'is-hidden': !searched}">
        <div class="column is-two-fifths">
          <img class="product-img" :src="this.item.imageUrls">
        </div>
    </div>
</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "../models/product.interface";

@Component
export default class Tracking extends Vue {
    public number = 0;
    public searched = false;
    
    search(){
        axios.get(APIConfig.buildUrl(`/products/${this.number}`), {
        params: {
            id: this.number
        }
        })
        .then((response) => {
            this.searched = true;
            this.item = response.data.product;
        }).catch(()=>{
            this.errorwarning();
            this.searched = false;
        });
        
        
    }

    errorwarning(){
        this.$toast.open({
            message: `Could not find Order`,
            position: 'is-bottom',
            type: 'is-danger'
        })
    }
    
    public item: iProduct = {
    id : 0,
    name : "",
    description : "",
    price : 0,
    imageUrls : "",
    stockCount : 0,
    tagString : "",
    tags : [],
    inStoreOnly : false
  };

}
</script>

<style scoped lang="scss">

  *{
    max-width: unset;
    width: unset;
    margin: 2%;
  }
</style>