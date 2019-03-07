<template>
  <div class="home">
    <div class="tile is-ancestor">
      <div class="hours tile is-vertical is-parent is-3">
        <div class="tile is-child box">
          <div class="tile">
            <figure class="image">
              <img src="../../public/close.gif">
          </figure>
          </div>
          <div class="tile is-child">
            <p class="title">Hours</p>
            <a class="button is-light" v-bind:class="{ 'is-hidden': !isLoggedIn}" >Edit</a>
            <table style="width:100%">
              <tr>
                <th>Weekdays</th>
                <th>Weekends</th> 
                <th></th>
              </tr>
              <tr>
                <td>8 am - 7 pm</td>
                <td>10 am - 6 pm</td> 
                <td></td>
              </tr>
            </table>
            <br>
            <br>

          </div>
        </div>
      </div>

      <div class="announcement tile is-parent is-vertical">
        <div class="tile">
        <a class="button is-primary" v-bind:class="{ 'is-hidden': !isLoggedIn}" v-on:click="showLoginModal()">New Announcement</a>
        <a class="button is-danger" v-bind:class="{ 'is-hidden': !isLoggedIn}" v-on:click="deleteAnnounce()">Delete Announcement</a>
        </div>
        {{getAnnounce()}}
        <div class="tile is-child box " v-bind:class="{ 'is-hidden': hasAnnounce()}" >
          <p class="title">{{this.announcement.title}}</p>
          
          <h2>{{ this.announcement.description}}</h2>
          <img  :src=this.announcement.imageurl>
          
        </div>
        <div class="tile is-child">
          <p class="title">Featured</p>
        </div>
        <div class="tile is-child">
          <p class="subtitle">14256 Frank Pilling Road, San Luis Obispo, 93407</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.2347832287987!2d-120.66442254947114!3d35.30014725828843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ecf1b3ba70fff3%3A0x4b4cd567ef80b51e!2sFrank+E.+Pilling+Computer+Science%2C+San+Luis+Obispo%2C+CA+93405!5e0!3m2!1sen!2sus!4v1551915459089" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
      </div>
      
    </div>
    
    
<Announcement v-bind:is-showing="showAnnounce" v-on:success="successLogin()" v-on:cancel="cancelLogin()"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Announcement from "../components/Announcement.vue"
import { APIConfig } from "../utils/api.utils";
import { Announce } from "../../../api/entity";
import axios, { AxiosError, AxiosResponse } from "axios";

@Component({
  components:{
    Announcement
  }
})

export default class Home extends Vue {
  public showAnnounce: boolean = false;
  public announcement: Announce = {
    id : 0,
    description : "",
    imageurl : "",
    title:""
  };

  error: string | boolean = false;

  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  showLoginModal() {
    this.showAnnounce = true;
  }

  successLogin() {
    this.showAnnounce = false;
  }

  cancelLogin() {
    this.showAnnounce = false;
  }

  mounted (){
    this.getAnnounce();
  }

  getAnnounce() {
    axios.get(APIConfig.buildUrl(`/announce`), {})
    .then((response) => {
        // debugger;
        this.announcement = response.data.announce[0];
    });
  }

  hasAnnounce (){
    return (this.announcement.description == "");
  }

  deleteAnnounce(){
    this.error = false;
    axios
      .delete(APIConfig.buildUrl("/announce"),{})
      .then((response) => {this.$emit("success");})
      .catch((res: AxiosError) => {
        this.error = res.response && res.response.data.error;
      });
  }

}

</script>


<style scoped lang="scss">
  .home {
    max-width: unset;
    width: unset;
    margin: 2%;
  }
</style>