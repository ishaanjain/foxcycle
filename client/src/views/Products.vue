 <template>
  <div class="products">
    <div class="columns">
      <div class="column is-four-fifths">
        <a
          class="button is-light"
          v-if="isLoggedIn"
          v-on:click="showAddProductModal()"
        >Add a New Product</a>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-fifth">
        <h4 class="title is-4">Filter By</h4>
        <div class="product-filters">
          <div v-for="(tag, index) in tags" v-bind:key="index">
            <h4 class="subtitle filter-header">{{tag.name}}:</h4>
            <div class="filter-types">
              <div v-for="(t, i) in tag.t" v-bind:key="i">
                <label class="checkbox">
                  <input type="checkbox" v-on:click="applyTag(t)" v-bind:checked="t.applied">
                  {{t.s}}
                </label>
              </div>
            </div>
          </div>
        </div>
        <a class="button is-primary apply-button" v-on:click="applyFilters()">Apply</a>
        <a class="button is-light" v-on:click="clearAllFilters()">Reset</a>
        <AddNewProduct
          v-bind:is-showing="showAddProduct"
          v-on:success="successAddProduct()"
          v-on:cancel="cancelAddProduct()"
        />
      </div>
      <div class="column is-four-fifths">
        <h4 class="title is-4">Products</h4>
        <div class="container products-container">
          <div class="p-parent">
            <div v-for="(item, index) in items" v-bind:key="index">
              <router-link :to="{name: 'product detail', params: { id: item.id.toString() }}">
                <div class="box product">
                  <h1 class="product-title title is-5">{{item.name}}</h1>
                  <img class="product" :src="item.imageUrls">
                  <p class="title is-5 item-price">${{item.price}}</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import App from "@/App.vue";
import AddNewProduct from "@/components/AddNewProduct.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "../models/product.interface";
import { iTag } from "../models/tag.interface";

@Component({
  components: {
    App,
    AddNewProduct
  }
})
export default class Products extends Vue {
  public showAddProduct: boolean = false;
  public items: iProduct[] = [];
  public tags: TagType[] = [];
  public tagList: String[] = [];
  public tagNameList: String[] = [];
  public filters: String[] = [];

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  getItems() {
    axios
      .get(APIConfig.buildUrl("/products"), {
        headers: {
          token: this.$store.state.userToken
        },
        params: {
          filters: this.filters
        }
      })
      .then(response => {
        this.items = response.data.products;
        this.generateTagList();
      });
  }

  getFilterItems() {
    axios
      .get(APIConfig.buildUrl("/products/"), {
        params: {
          filters: this.filters
        }
      })
      .then(response => {
        this.items = response.data.products;
      });
  }

  showAddProductModal() {
    this.showAddProduct = true;
  }

  successAddProduct() {
    this.showAddProduct = false;
    this.getItems();
  }
  cancelAddProduct() {
    this.showAddProduct = false;
  }

  mounted() {
    this.getItems();
  }

  generateTagList() {
    this.tags = [];
    this.tagList = [];
    this.tagNameList = [];
    for (var i = 0; i < this.items.length; i++) {
      var tags: iTag[] = this.items[i].tags;
      for (var j = 0; j < tags.length; j++) {
        if (!this.tagList.includes(tags[j].name)) {
          this.tagList.push(tags[j].name);
        }
      }
    }
    this.tagList.sort((n1, n2) => {
      if (n1 > n2) {
        return 1;
      }
      if (n1 < n2) {
        return -1;
      }
      return 0;
    });
    var index = -1;
    for (var i = 0; i < this.tagList.length; i++) {
      var name = this.tagList[i]
        .substring(0, this.tagList[i].indexOf(":"))
        .toUpperCase();
      var tagVal = this.tagList[i].substring(this.tagList[i].indexOf(":") + 1);
      if (!this.tagNameList.includes(name)) {
        this.tagNameList.push(name);
        this.tags.push({ name: name, t: [] });
        index++;
      }
      if (
        this.tags[index] != undefined &&
        !this.tags[index].t.includes({ s: tagVal, applied: false })
      ) {
        this.tags[index].t.push({ s: tagVal, applied: false });
      }
    }
  }

  applyTag(t: TagApplied) {
    if (t.applied) t.applied = false;
    else t.applied = true;
  }

  clearAllFilters() {
    for (var i = 0; i < this.tags.length; i++) {
      for (var j = 0; j < this.tags[i].t.length; j++) {
        this.tags[i].t[j].applied = false;
      }
    }
    this.filters = [];
    this.getItems();
  }

  applyFilters() {
    this.filters = [];
    for (var i = 0; i < this.tags.length; i++) {
      for (var j = 0; j < this.tags[i].t.length; j++) {
        if (this.tags[i].t[j].applied) {
          this.filters.push(this.tags[i].name + ":" + this.tags[i].t[j].s);
        }
      }
    }
    this.getFilterItems();
  }
}

export interface TagType {
  name: string;
  t: TagApplied[];
}

export interface TagApplied {
  s: string;
  applied: boolean;
}
</script>

<style lang="scss">
h1.product-title {
  height: 20px;
  margin-bottom: 0px;
}

img.product {
  height: 76%;
  margin: 0px 0px 16px 0px;
}

.product:hover {
  cursor: pointer;
}

.product {
  height: 300px;
  width: 300px;
  float: left;
  margin: 14px 28px 14px 0px;
}

.p-parent {
  width: 88%;
}

.item-price {
  text-align: right;
}

.filter-types {
  padding-bottom: 26px;
}

h4.filter-header.subtitle {
  margin-bottom: 4px;
}

.products {
  margin-top: 20px;
}

.apply-button {
  margin-right: 10px;
}
</style>
