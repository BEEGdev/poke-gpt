<script>
import PokemonPlayer from './components/PokemonPlayer.vue'
import { endGameAlert } from './modules/SweetAlert.js'
export default {
  name: 'App',
  components: {
    PokemonPlayer
  },
  async mounted() {
    await this.pokeApiRequest()
  },
  data() {
    return {
      player1: {
        name: 'Cargando',
        src: 'https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
        message: ' '
      },
      player2: {
        name: 'Cargando',
        src: 'https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
        message: ' '
      },
      isButtonDisabled: true,

      messageList: [],

      playerTurn: 0
    }
  },
  methods: {
    async pokeApiRequest() {
      const id1 = 1 + Math.floor(Math.random() * 150)
      const id2 = 1 + Math.floor(Math.random() * 150)
      const player1 = await this.getPokemonInfo(id1)
      const player2 = await this.getPokemonInfo(id2)
      this.player1.name = player1.name
      this.player2.name = player2.name
      this.player1.src = player1.src
      this.player2.src = player2.src
      this.isButtonDisabled = false
      this.messageList.push(`${player1.name}: se unió a la partida.`),
        this.messageList.push(`${player2.name}: se unió a la partida.`),
        this.messageList.push(
          `${player1.name}: ¿Qué hace un Pikachu en una biblioteca? ${player2.name}: No lo sé, ¿qué?`
        ),
        this.messageList.push(
          `${player1.name}: ¡Está buscando su cola perdida en los libros de cola!`
        ),
        this.messageList.push(
          `${player2.name}: ¿Sabes por qué a los Gastly no les gusta bañarse? `
        ),
        this.messageList.push(`${player1.name}: No, ¿por qué?. `),
        this.messageList.push(
          `${player2.name}: Porque pierden su poder cuando están mojados, ¡se vuelven Gashlympos!`
        ),
        this.messageList.push(
          `${player1.name}: Jaja, ${player2.name}, eres un auténtico ${player1.name}-chiste.'`
        )
    },
    async getPokemonInfo(id) {
      const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
      const response = await fetch(URL)
      const data = await response.json()
      const pokemon = {
        name: data.name,
        src: data.sprites.other['official-artwork']['front_default']
      }
      return pokemon
    },
    nextTurn() {
      if (this.playerTurn === 0) {
        this.player1.message = this.messageList.shift()
      } else if (this.playerTurn === 1) {
        this.player2.message = this.messageList.shift()
      }

      this.playerTurn = (this.playerTurn + 1) % 2

      if (this.messageList.length === 0) {
        this.isButtonDisabled = true
        endGameAlert()
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <nav>
      <img src="img/pokemon-logo.png" alt="Pokemon" />
      <div class="button-group">
        <button @click="nextTurn" :disabled="isButtonDisabled">Siguente turno</button>
        <!-- TODO
        <button></button>
        <button></button>
        -->
      </div>
    </nav>
    <div class="battle">
      <PokemonPlayer
        :name="player1.name"
        :src="player1.src"
        :message="player1.message"
      ></PokemonPlayer>
      <PokemonPlayer
        :name="player2.name"
        :src="player2.src"
        :message="player2.message"
      ></PokemonPlayer>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Play:wght@700&family=Press+Start+2P&display=swap');

body {
  margin: 0;
  background-color: aqua;
}
nav {
  background: black;
  min-height: 100px;
  display: flex;
}

nav img {
  height: 125px;
}

button {
  margin-top: 20px;
  line-height: 60px;
  font-weight: bold;
  font-size: large;
  color: black;
  padding: 0 40px;
  background: lightblue;
  border: 3px solid #003060;
  border-radius: 40px;
  box-shadow: 0 5px 20px 3px rgba(0, 0, 0, 0.6);
}

button[disabled] {
  background-color: #999;
  color: #555;
  border-color: #fff;
}

button:not([disabled]):hover {
  position: relative;
  translate: 2px 2px;
  box-shadow: -2px -2px 10px 2px black inset;
}

.button-group {
  display: flex;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-right: 2rem;
}
</style>
