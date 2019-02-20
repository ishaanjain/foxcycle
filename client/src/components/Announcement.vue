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
        <label class="label">Description</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Description"
            v-model="words.description"
          >
        </div>
      </div>
        <!-- <div class="profilePhoto">
          <img :src="profileUrl"/>
        </div>
        <div class="file">
          <label class="file-label">
            <input
              type="file"
              name="profilePhoto"
              :disabled="isSaving"
              v-on:change="filesChanged"
              accept="image/*"
              class="input-file file-input"
            >
            <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon icon="upload"/>
              </span>
              <span class="file-label">
                Upload image...
              </span>
            </span>
          </label>
          <p v-if="isSaving">Uploading file...</p>
        </div> -->
      </form>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Modal from "./Modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class Announcement extends Vue {
  words: descript = {
    description: "",
  };
  error: string | boolean = false;
  @Prop(Boolean) isShowing: boolean = false;

  @Watch("isShowing")
  handleShowing(isShowingStart: boolean, isShowingEnd: boolean) {
    if (!isShowingStart && isShowingEnd) {
      this.words = {
        description: ""
      };
    }
  }

  success() {
    this.error = false;
    axios
      .post(APIConfig.buildUrl("/announce"), {
        description: this.words.description
      })
      .then((response) => {})
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
  }

  cancel() {
    this.$emit("cancel");
  }
}

export interface descript {
  description: string;
}
</script>
