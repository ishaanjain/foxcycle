<template>
  <div class="todos">
    <div>Hi from todos</div>

    <div v-for="(todo, index) in mytodos" v-bind:key="index">
      <span>{{ todo.name }}</span>
      <span>{{ todo.duedate }}</span>
    </div>
    <button class="button" v-on:click="addTodoItem">Add</button>
  </div>
<<<<<<< HEAD

=======
  
>>>>>>> 741e3335db43397093bd5c5fd609569345cb4687
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class ToDos extends Vue {
  mytodos: ToDo[] = [
    { name: "Tod one", duedate: undefined },
    { name: "todo two", duedate: undefined },
    { name: "todo three", duedate: undefined }
  ];
  addTodoItem() {
    this.mytodos.push({name: `todo${new Date().getTime()}`, duedate: undefined});
  }
}
<<<<<<< HEAD
=======

>>>>>>> 741e3335db43397093bd5c5fd609569345cb4687
interface ToDo {
  name: string;
  duedate: Date | undefined;
}
</script>

<style scoped>
</style>
<<<<<<< HEAD
=======

>>>>>>> 741e3335db43397093bd5c5fd609569345cb4687
