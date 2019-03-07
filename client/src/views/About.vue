<template>
  <div class="about">
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

</template>



<script>

  export default {
    
  }
</script>
