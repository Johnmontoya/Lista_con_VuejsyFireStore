<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Lista de elementos de Computo
        <!--b-link  es un elemento de vinculacion de VueJS-->
        <b-link href="#/add-board">(Agregar elemento)</b-link>
      </h2>
      <b-table striped hover :items="boards" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Detalles</b-btn>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>

//importacion del modulo firebase y las rutas 
import firebase from '../Firebase'
import router from '../router/index'

export default {
  name: 'BoardList',
  data () {
    return {
      //encabezado de titulos de la tabla. sortable sirve para generar un boton que ordena alfabeticamente esa columna
      fields: {
        title: { label: 'Nombre', sortable: true, 'class': 'text-left' },
        actions: { label: 'Acciones', 'class': 'text-center' }
      },
      //array vacio donde pasaran los datos de la base de datos
      boards: [],
      errors: [],
      //conexion con firebase y la tabla boards, asignadas a la variable ref
      ref: firebase.firestore().collection('boards'),
    }
  },
  created () {
    //onSnapshot detecta la coleccion de datos y querySnapshot es el parametro que obtendra la consulta
    this.ref.onSnapshot((querySnapshot) => {
      this.boards = [];
      //querySnapshot y el metodo forEach permiten acceder a los documentos 
      querySnapshot.forEach((doc) => {
        this.boards.push({
          //Obtenemos el id y titulo de cada documento
          key: doc.id,
          title: doc.data().title
        });
      });
    });
  },
  methods: {
    details (board) {
      router.push({ name: 'ShowBoard', params: { id: board.key }})
    }
  }
}
</script>

<style>
  .table {
    width: 96%;
    margin: 0 auto;
  }
</style>