<template>
  <modal v-bind:is-showing="isShowing" title="Delete Service" success-button="Delete" v-on:success="success" v-on:cancel="cancel">
    <form v-on:submit.prevent="onSubmit">
      <p v-if="error" class="is-danger">
        {{ error }}
      </p>
      <div class="field">
        <label class="label">Are you sure you want to delete this service? There's no going back...</label>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "./Modal.vue";
import { iService} from "../models/service.interface";
@Component({
  components: { Modal }
})
export default class DeleteService extends Vue {
  @Prop(Boolean) isShowing: boolean = false;
  @Prop() service!: iService;
  error: string | boolean = false;
  success() {
    this.error = false;
    axios
      .delete(APIConfig.buildUrl(`/services/${this.service.id}`), {
        headers: {
          token: this.$store.state.userToken
        }
      })
      .then((response: AxiosResponse<iService>) => {
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