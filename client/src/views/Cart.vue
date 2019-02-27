<template>
<div id="app" class="container">
   <div class="text-right"><button class="btn btn-primary" data-toggle="modal" data-target="#cartModal">Cart ({{cartItems.length}})</button></div>
  
   <!-- Modal --> 
   <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">          <span aria-hidden="true">&times;</span></button>
               <h4 class="modal-title" id="myModalLabel">Cart</h4>
            </div>
            <div class="modal-body">
               <shopping-cart inline-template :items="cartItems">
                  <div>
                     <table class="table table-cart">
                        <tr v-for="(item, index) in items" v-bind:key="index">
                           <td>{{item.title}}</td>
                           <td style="width:120px">QTY:
                              <input v-model="item.qty" class="form-control input-qty" type="number">
                           </td>
                           <td class="text-right">${{item.price | formatCurrency}}</td>
                           <td>
                              <button @click="removeItem(index)"><span class="glyphicon glyphicon-trash"></span></button>
                           </td>
                        </tr>
                        <tr v-show="items.length === 0">
                           <td colspan="4" class="text-center">Cart is empty</td>
                        </tr>
                        <tr v-show="items.length > 0">
                           <td></td>
                           <td class="text-right">Cart Total</td>
                           <td class="text-right">${{Total | formatCurrency}}</td>
                           <td></td>
                        </tr>
                     </table>
                  </div>
                  <!-- /.container -->
               </shopping-cart>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
         </div>
      </div>
   </div>
	
   <div class="container">
      <div class="row">
         <div class="col-xs-3 text-center" v-bind:key="index">
            <img class="img-responsive" :src="item.image" alt="">
            <h5>{{ item.title }}</h5>
            <h6>${{ item.price | formatCurrency }}</h6>
            <p class="text-center"><input v-model="item.qty" type="number" class="form-control" placeholder="Qty" min="1"/>
							 
               <button @click="addToCart(item)" class="btn btn-sm btn-primary">Add to Cart</button>
            </p>
         </div>
      </div>
   </div>
</div>
</template>

<style>

.container{
  padding:20px;
  max-width:600px;
}

.input-qty {
  width: 60px;
  float: right
}

.table-cart > tr > td {
  vertical-align: middle !important;
}
</style>

<script>
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

// @Component({
//   components: { dsfsdfsd
//     HelloWorld
//   }
// })

@Component
export default class Cart extends Vue {}

const products = [
	{id: 1,title: 'Macbook Pro', price: 2500.00, qty: 1, image: 'http://lorempixel.com/150/150/'},  
	{id: 2,title: 'Gameboy',price: 1000.00, qty: 1,image: 'http://lorempixel.com/150/150/'},  
	{id: 3,title: 'Kindle',price: 150.00,qty: 1,image: 'http://lorempixel.com/150/150/'},  
	{id: 4,title: 'Some Product',price: 10, qty: 1, image: 'http://lorempixel.com/150/150/'},  
];

function formatNumber(n, c, d, t){
	var c = isNaN(c = Math.abs(c)) ? 2 : c, 
			d = d === undefined ? '.' : d, 
			t = t === undefined ? ',' : t, 
			s = n < 0 ? '-' : '', 
			i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
			j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

Vue.filter('formatCurrency', function (value) {
  return formatNumber(value, 2, '.', ',');
});
    
Vue.component('shopping-cart', {
  props: ['items'],

  computed: {
    Total: function() {
      var total = 0;
      this.items.forEach(item => {
        total += (item.price * item.qty);
      });
      return total;
    }
  },

  methods: {
    removeItem(index) {
      this.items.splice(index, 1)
    }
  }
})

const vm = new Vue({
  el: '#app',
	
  data: {
    cartItems: [],
    items : products
  },
	
  methods: {
    addToCart(itemToAdd) {
      var found = false;

      // Check if the item was already added to cart
			// If so them add it to the qty field
      this.cartItems.forEach(item => {
        if (item.id === itemToAdd.id) {
          found = true;
          item.qty += itemToAdd.qty;
        }
      });

      if (found === false) {
        this.cartItems.push(Vue.util.extend({}, itemToAdd));
      }
			
			itemToAdd.qty = 1;
    }
  }
})
</script>
