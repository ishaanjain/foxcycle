<template>
  <div class="about">
    <div class="container is-fullhd">
      <div class="columns">
        <div class="column">
          <img :src="this.about.imageurl">
        </div>
        <div class="column">
          <br>
          <p class="title has-text-centered">{{this.about.title}}</p>
          <br>
          <p class="subtitle has-text-centered">{{this.about.description}}</p>
          <section>
            <b-collapse :open="false" aria-id="contentIdForA11y1">
              <button
                class="button is-primary"
                slot="trigger"
                aria-controls="contentIdForA11y1"
                v-bind:class="{'is-hidden': !this.$store.state.user}"
              >Edit</button>
              <div class="notification">
                <div class="content">
                  <b-field label="Title">
                    <b-input v-model="about.title" maxlength="30"></b-input>
                  </b-field>
                  <b-field label="Phone Number">
                    <b-input v-model="about.phone" maxlength="12"></b-input>
                  </b-field>
                  <b-field label="Address">
                    <b-input v-model="about.address" maxlength="100"></b-input>
                  </b-field>
                  <b-field label="Body">
                    <b-input v-model="about.description" maxlength="250"></b-input>
                  </b-field>
                  <b-field label="Image URL">
                    <b-input v-model="about.imageurl" maxlength="250"></b-input>
                  </b-field>
                  <p class="control">
                    <a class="button is-primary" v-on:click="success" @click="toast">Save</a>
                  </p>
                </div>
              </div>
            </b-collapse>
          </section>
        </div>
      </div>
    </div>
    <div class="container is-fluid">
      <div class="tile is-child">
        <p class="title">Location:</p>
        <p class="subtitle">{{this.about.address}}</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.2349593975964!2d-120.6644171849926!3d35.30014288028496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ecf1b3ba70fff3%3A0x4b4cd567ef80b51e!2sFrank+E.+Pilling+Computer+Science%2C+San+Luis+Obispo%2C+CA+93405!5e0!3m2!1sen!2sus!4v1552339821933"
          width="100%"
          height="400px"
          frameborder="0"
          style="border:0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosError, AxiosResponse } from "axios";
import { About } from "../../../api/entity";
import { APIConfig } from "../utils/api.utils";

@Component
export default class Something extends Vue {
  public about: About = {
    id: 0,
    description: "",
    imageurl: "",
    title: "",
    phone: "805-123-4567",
    address: ""
  };
  error: string | boolean = false;

  mounted() {
    // debugger;
    this.getAbout();
  }

  getAbout() {
    axios.get(APIConfig.buildUrl(`/about`), {}).then(response => {
      // debugger;
      if (response.data.about != undefined) {
        this.about = response.data.about[0];
      }
    });
  }

  success() {
    this.error = false;
    axios
      .delete(APIConfig.buildUrl("/about"), {})
      .then(response => {
        axios
          .post(APIConfig.buildUrl("/about"), this.about, {})
          .then(response => {
            this.$emit("success");
          })
          .catch((res: AxiosError) => {
            this.error = res.response && res.response.data.error;
          });
      })
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
  }

  toast() {
    this.$toast.open({
      message: "Saved!",
      type: "is-success"
    })!;
  }
}
</script>
