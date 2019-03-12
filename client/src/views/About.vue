<template>
  <div class="about">
    <div class="container is-fullhd">
      <div class="columns">
    <div class="column">
      <img src="../../public/robert.jpg">
    </div>
    <div class="column">
      
      <p class="title has-text-centered"> Our Story </p>
      <br>
      <p class="subtitle has-text-centered"> This company got bought by Robert Downey Jr. in 2046. Now we provide the most technologically advanced
        parts the world has ever seen. 
        Please buy our products! Thanks.
      </p>
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
                  <b-field label="Title">
                      <b-input 
                          maxlength="30">
                      </b-input>
                  </b-field>
                  <b-field label="Phone Number">
                      <b-input 
                          maxlength="12">
                      </b-input>
                  </b-field>
                  <b-field label="Address">
                      <b-input 
                          maxlength="100">
                      </b-input>
                  </b-field>
                  <b-field label="Body">
                      <b-input
                          maxlength="250">
                      </b-input>
                  </b-field>
                  <b-field label="Image URL">
                      <b-input 
                          maxlength="250">
                      </b-input>
                  </b-field>
                  <p class="control">
                    <button class="button is-primary">Send</button>
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
          <p class="subtitle">14256 Frank Pilling Road, San Luis Obispo, 93407</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.2347832287987!2d-120.66442254947114!3d35.30014725828843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ecf1b3ba70fff3%3A0x4b4cd567ef80b51e!2sFrank+E.+Pilling+Computer+Science%2C+San+Luis+Obispo%2C+CA+93405!5e0!3m2!1sen!2sus!4v1551915459089" width="100%" height="500px" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
</div>

  </div>

</template>



<script>

  export default {
    
  }
</script>
