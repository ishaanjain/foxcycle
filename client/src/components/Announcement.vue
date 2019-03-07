<template>
  <modal
    v-bind:is-showing="isShowing"
    title="Announce"
    success-button="Post"
    v-on:success="success"
    v-on:cancel="cancel"
  >
    <form  enctype="multipart/form-data" novalidate v-on:submit.prevent="onSubmit">
      <div class="field">
        <div class="field">
          <label class="label">title:</label>
          <div class="control">
            <textarea class="input" type="" placeholder="title" v-model="announce.title"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Announcement:</label>
          <div class="control">
            <textarea class="input" type="" placeholder="announcement" v-model="announce.description"></textarea>
          </div>
        </div>
        </div>
          <div class="field">
          <label class="label">Image Url:</label>
          <div class="control">
            <input class="input" type="text" placeholder="image" v-model="announce.imageurl">
          </div>
        </div>
        <span>
          <img  :src="announce.imageurl"/>
        </span>
        
      </form>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Modal from "./Modal.vue";
import {iAnnounce} from "../models/announce.interface";
import { Announce } from "../../../api/entity";

@Component({
  components: {
    Modal
  }
})
export default class Announcement extends Vue {
  announce: iAnnounce = {
    description: "",
    imageurl: "",
    title:""
  }

  error: string | boolean = false;
  @Prop(Boolean) isShowing: boolean = false;


  success() {
    this.error = false;
    axios
      .delete(APIConfig.buildUrl("/announce"),{})
      .then((response) => {this.$emit("success");})
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
    axios
      .post(APIConfig.buildUrl("/announce"), this.announce, {})
      .then((response) => {this.$emit("success");})
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
  }

  cancel() {
    this.$emit("cancel");
  }
}

</script>
