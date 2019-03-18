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
                  <section>

        <b-collapse :open="false" aria-id="contentIdForA11y1">
            <button
                class="button is-primary"
                slot="trigger"
                aria-controls="contentIdForA11y1"
                v-bind:class="{'is-hidden': !this.$store.state.user}"
            >Edit
            </button>
            <div class="notification">
                <div class="content">
                  <b-field horizontal label="Day" min="3">
                  <b-select v-model="time.name" >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </b-select>
                  </b-field>
                  <b-field label="Open">
                      <b-input type="number" v-model="time.start" min="1"
                      max="24" step ="1"></b-input>
                  </b-field>
                  <b-field label="Close">
                      <b-input type="number" v-model="time.end" min="1"
                      max="24" step ="1"></b-input>
                  </b-field>

                  <p class="control">
                    <a class="button is-primary"
                       v-on:click="success" 
                    >Save
                   </a>
                  </p>
                   
               
                </div>
            </div>
        </b-collapse>

    </section>
                  <table class="table" v-if="this.time != undefined">
                    <thead>
                    <tr>
                      <th>Hours</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(t, index) in hours" v-bind:key="index">
                        <td>{{t.name}}</td>
                        <td>{{t.start}} - {{t.end}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br>
                  <br>
               </div>
            </div>
         </div>
         <div class="announcement tile is-parent is-vertical is-9" >
            <div class="tile">
               <a class="button is-primary edit-announcement" v-bind:class="{ 'is-hidden': !isLoggedIn}" v-on:click="showAnnouncementModal()">Edit/Add Announcement</a>
               <a class="button is-danger" v-if="hasAnnounce()" v-bind:class="{ 'is-hidden': !isLoggedIn}" v-on:click="showDeleteAnnouncementModal()">Delete Announcement</a>
            </div>
            <div class="tile is-child box " v-bind:class="{ 'is-hidden': !hasAnnounce()}" >
               <p class="title">{{this.announcement.title}}</p>
               <h2>{{ this.announcement.description}}</h2>
               <img :src=this.announcement.imageurl >
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
    start: 0,
    end: 0,
    name: ""
  }

  wait(){
    this.$toast.open("wait...");
  }

  toast(){
      this.$toast.open({
                    message: 'Saved!',
                    type: 'is-success'
                })
  }

  hours: iTime[] = [];

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
    axios.get(APIConfig.buildUrl(`/time`), {})
    .then((response) => {
        if (response.data.time.length > 0) {
          this.hours = response.data.time;
          let day = this.currenttime.toString().split(' ')[0];
          var arrday;
          var index;
          for(index = 0; index < this.hours.length; index++){
            var newstring = this.hours[index].name;
            if(newstring.indexOf(day) != -1)
              arrday = this.hours[index];
          }
          if(arrday != undefined)
          if(this.currenttime.getHours() < arrday.start || this.currenttime.getHours() > arrday.end)
            this.open = false;
          else
            this.open = true;
        } 
    });

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


  success() {
    this.error = false;
    axios
      .put(APIConfig.buildUrl("/time"), this.time, {})
      .then((response) => {
        this.$emit("success");
        let day = response.data.time.name;
          var arrday;
          var index;
          for(index = 0; index < this.hours.length; index++){
            var newstring = this.hours[index].name;
            if(newstring.indexOf(day) != -1){
              this.hours[index] = response.data.time;
              arrday = response.data.time;
              console.log(arrday);
            }
          }
          if(arrday == undefined)
            this.hours.push(response.data.time);  
          this.time = response.data.time;
       
      })
      .catch((res: AxiosError) => {
      this.error = res.response && res.response.data.error;
      
    });

    this.toast();
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