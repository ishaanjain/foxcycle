<template>
   <div class="home">
      <div class="tile is-ancestor">
         <div class="hours tile is-vertical is-parent is-3">
            <div class="tile is-child box">
               <div class="tile">
                  <figure class="image" v-bind:class="{ 'is-hidden': this.open}">
                     <img src="../../public/close.gif">
                  </figure>
                  <figure class="image" v-bind:class="{ 'is-hidden': !this.open}">
                     <img src="../../public/open.png">
                  </figure>
               </div>
               <div class="tile is-child">
                  <!-- <p class="title">Hours</p> -->
                  <!-- <a class="button is-light" v-bind:class="{ 'is-hidden': !isLoggedIn}" >Edit</a> -->
                  <button class="button is-light is-dark" v-bind:class="{ 'is-hidden': !isLoggedIn}">
                      Edit
                  </button>
                  <table class="table" v-if="this.time != undefined">
                    <thead>
                    <tr>
                      <th>Hours</th>
                    </tr>
                    </thead>
                    <tbody>

                      <tr>
                        <th>Monday</th>
                        <td>{{this.time.monstart}} - {{this.time.monend}}</td>

                      </tr>
                      <tr>
                        <th>Tuesday</th>

                        <td>{{this.time.tuestart}} - {{this.time.tuesend}}</td>
                      </tr>
                      <tr>
                        <th>Wednesday</th>
                        <td>{{this.time.wedstart}} - {{this.time.wedend}}</td>

                      </tr>
                      <tr>
                        <th>Thursday</th>
                        <td>{{this.time.thurstart}} - {{this.time.thursend}}</td>

                      </tr>
                      <tr>
                        <th>Friday</th>
                        <td>{{this.time.fristart}} - {{this.time.friend }}</td>

                      </tr>
                      <tr>
                        <th>Saturday</th>
                        <td>{{this.time.satstart }} - {{this.time.satend}}</td>

                      </tr>
                      <tr>
                        <th>Sunday</th>
                        <td>{{this.time.sunstart}} - {{this.time.sunend }}</td>

                      </tr>
                      <!-- <tr>
                        <th>Holiday</th>
                         <td>{{this.time.holistart }} - {{this.time.holiend }}</td> 
                          <b-timepicker
                            rounded
                            icon="clock"
                            :hour-format='12'>
                          </b-timepicker>
                          <p> - </p>
                          <b-timepicker
                            rounded
                            icon="clock"
                            :hour-format='12'>
                          </b-timepicker>
                      </tr> -->
                    </tbody>
                  </table>
                  <br>
                  <br>
               </div>
            </div>
         </div>
         <div class="announcement tile is-parent is-vertical">
            <div class="tile">
               <a class="button is-primary edit-announcement" v-bind:class="{ 'is-hidden': !isLoggedIn}" v-on:click="showAnnouncementModal()">Edit/Add Announcement</a>
               <a class="button is-danger" v-if="hasAnnounce()" v-bind:class="{ 'is-hidden': !isLoggedIn}" v-on:click="showDeleteAnnouncementModal()">Delete Announcement</a>
            </div>
            <div class="tile is-child box " v-bind:class="{ 'is-hidden': !hasAnnounce()}" >
               <p class="title">{{this.announcement.title}}</p>
               <h2>{{ this.announcement.description}}</h2>
               <img  :src=this.announcement.imageurl>
            </div>
            <div class="tile is-child">
               <p class="title">Featured</p>
               <div class="container products-container">
                  <div class="p-parent">
                     <div v-for="(item, index) in items" v-bind:key="index">
                        <router-link :to="{name: 'product detail', params: { id: item.id.toString() }}">
                           <div class="box product">
                              <h1 class="product-title title is-5">{{item.name}}</h1>
                              <img class="product" :src=item.imageUrls>
                              <p class="title is-5 item-price">${{item.price}}  </p>
                           </div>
                        </router-link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <Announcement v-bind:announce="announcement" v-bind:is-showing="showAnnounce" v-on:success="successAnnouncement()" v-on:cancel="cancelAnnouncement()"/>
      <DeleteAnnouncement v-bind:announce="announcement" v-bind:is-showing="showDeleteAnnounce" v-on:success="successDeleteAnnouncement()" v-on:cancel="cancelDeleteAnnouncement()"/>
   </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Announcement from "../components/Announcement.vue"
import DeleteAnnouncement from "../components/DeleteAnnouncement.vue"
import { APIConfig } from "../utils/api.utils";
import axios, { AxiosError, AxiosResponse } from "axios";
import { iProduct } from "../models/product.interface";
import { iAnnounce } from "../models/announce.interface";
import { iTime } from "../models/time.interface";

@Component({
  components:{
    Announcement, DeleteAnnouncement
  }
})

export default class Home extends Vue {
  public showAnnounce: boolean = false;
  public showDeleteAnnounce: boolean = false;
  public announcement: iAnnounce = {
    description : "",
    imageurl : "",
    title : ""
  };

  public time: iTime = {
    id: 0,
    monstart: undefined,
    monend: undefined,
    tuestart: undefined,
    tuesend: undefined,
    wedstart: undefined,
    wedend: undefined,
    thursstart: undefined,
    thursend: undefined,
    fristart: undefined,
    friend: undefined,
    satstart: undefined,
    satend: undefined,
    sunstart: undefined,
    sunend: undefined,
    holistart: undefined,
    holiend: undefined
  }

  public currenttime = new Date();

  public open = false;

  error: string | boolean = false;

  public items: iProduct[] = [];
  get isLoggedIn(): boolean {
    return !!this.$store.state.user;
  }

  showAnnouncementModal() {
    this.showAnnounce = true;
  }

  successAnnouncement() {
    this.showAnnounce = false;
  }

  cancelAnnouncement() {
    this.showAnnounce = false;
  }

  showDeleteAnnouncementModal() {
    this.showDeleteAnnounce = true;
  }

  successDeleteAnnouncement() {
    this.showDeleteAnnounce = false;
    this.announcement = {
      description : "",
      imageurl : "",
      title:""
    };
  }

  cancelDeleteAnnouncement() {
    this.showDeleteAnnounce = false;
  }

  mounted() {
    this.getItems();
    this.getAnnounce();
    this.getTime();
  }

  getAnnounce() {
    axios.get(APIConfig.buildUrl(`/announce`), {})
    .then((response) => {
        if (response.data.announce.length > 0) {
          this.announcement = response.data.announce[0];
        }
    });
  }

  getTime() {
    this.currenttime = new Date();
    
    axios.get(APIConfig.buildUrl(`/time`), {})
    .then((response) => {
      // debugger;
        if (response.data.time.length > 0) {
          this.time = response.data.time[0];
        }
    });
    if(this.time.monend != undefined && this.time.monstart != undefined)
    if(this.currenttime.getHours() > this.time.monend.getHours() || this.currenttime.getHours() < this.time.monstart.getHours())
      this.open = false;
    else 
      this.open = true;
  }

  hasAnnounce() {
    return (this.announcement.description != "");
  }

  getItems() {
    axios.get(APIConfig.buildUrl("/products"), {
      headers: {
        token: this.$store.state.userToken
      },
      params: {
        filters: []
      }
    })
    .then((response) => {
        this.items = response.data.products.slice(0, 3);
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

.edit-announcement {
  margin-right: 14px;
  margin-bottom: 14px;
}
</style>