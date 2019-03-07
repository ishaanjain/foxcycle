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
          <label class="label">Title:</label>
          <div class="control">
            <input class="input" type="text" placeholder="Title" v-model="announce.title">
          </div>
        </div>
        <div class="field">
          <label class="label">Description:</label>
          <div class="control">
            <textarea class="input textarea" type="textarea" placeholder="Announcement description" v-model="announce.description"></textarea>
          </div>
        </div>
        </div>
          <div class="field">
          <label class="label">Image Url:</label>
          <div class="control">
            <input class="input" type="text" placeholder="Image URL" v-model="announce.imageurl">
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
