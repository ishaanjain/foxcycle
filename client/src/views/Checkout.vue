<template>
<div>
    <div class="columns">
    <div class="column is-half">
        <p class="title">Cart</p>
        <table class="table">
        <thead>
        <tr>
            <th>Item</th>
            <th>Number</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in cart" v-bind:key="index">
            <td>{{item.name}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.price}}</td>
            </tr>
        </tbody>
        </table>
        <p class="subtitle">Total: ${{total}}</p>
    </div>
    <div class="column is-half">
        <div class="content">
            <b-field label="Name">
                <!-- <b-input maxlength="50"> </b-input> -->
            </b-field>
            

            <p class="control">
            <a class="button is-primary"
                v-on:click="checkout" 
            >Order</a>
            </p>
            
        
        </div>
    </div>
    </div>
</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProductOrder } from "../models/productOrder.interface";

@Component
export default class Checkout extends Vue {
    public cart = this.$store.state.items;
    public total = 0;

    mounted(){
        this.orderTotal();
    }

    orderTotal(){
        this.$store.state.items.forEach((i: iProductOrder) => {
            this.total += i.price;
        });
    }

    checkout(){

    }
}
</script>

<style scoped lang="scss">
  *{
    max-width: unset;
    width: unset;
    margin: 2%;
  }
</style>