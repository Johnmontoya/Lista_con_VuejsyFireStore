<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Editar elementos
        <router-link :to="{ name: 'ShowBoard', params: { id: key } }">(Lista de elementos)</router-link>
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
                         placeholder="Ingrese una breve descripión"
                         :rows="2"
                         :max-rows="6">{{board.description}}</b-form-textarea>
          </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    :label-cols="4"
                    label="Ingrese Autor">
            <b-form-input id="author" v-model.trim="board.author"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router/index'

export default {
  name: 'EditBoard',
  data () {
    return {
      //Obtenemos el id enviado desde la boardList
      key: this.$route.params.id,
      board: {}
    }
  },
  created () {
    //Obtenemos el documento que tiene el id enviado
    const ref = firebase.firestore().collection('boards').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.board = doc.data();
      } else {
        alert("Documento no encontrado o no existe!");
      }
    });
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const updateRef = firebase.firestore().collection('boards').doc(this.$route.params.id);
      updateRef.set(this.board).then((docRef) => {
        this.key = ''
        this.board.title = ''
        this.board.description = ''
        this.board.author = ''
        router.push({ name: 'ShowBoard', params: { id: this.$route.params.id }})
      })
      .catch((error) => {
        alert("Error agregando documento: ", error);
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
