<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Agregar Elemento
        <b-link href="#/">(Lista de elementos)</b-link>
      </h2>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group id="fieldsetHorizontal"
                    :label-cols="4"
                    label="Ingrese titulo">
            <b-form-input id="title" v-model.trim="board.title"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    :label-cols="4"
                    label="Ingrese Descripción">
              <b-form-textarea id="description"
                         v-model="board.description"
                         placeholder="Ingrese una breve descripción"
                         :rows="2"
                         :max-rows="6">{{board.description}}</b-form-textarea>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    :label-cols="4"
                    label="Ingrese Autor">
                    <!--trim: elimina los espacios del inicio o el final del texto-->
            <b-form-input id="author" v-model.trim="board.author"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Guardar</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router/index'

export default {
  name: 'AddBoard',
  data () {
    return {
      ref: firebase.firestore().collection('boards'),
      board: {}
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()

      //docRef es el parametro que localiza los documentos en la base de datos y sirve para crear, modificar o leer los datos 
      this.ref.add(this.board).then((docRef) => {
        this.board.title = ''
        this.board.description = ''
        this.board.author = ''
        router.push({
          name: 'BoardList'
        })
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>