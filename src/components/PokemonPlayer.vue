<script>
export default {
  name: 'PokemonPlayer',
  props: {
    name: {
      type: String,
      default: 'Ditto',
      required: true
    },
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pokemonName: this.name,
      pokemonImage: this.src
    }
  },
  methods: {},
  computed: {
    altImage() {
      return `Imagen del pokemon ${this.pokemonName}`
    }
  }
}
</script>

<template>
  <div class="pokemon">
    <div class="dialog">
      <p>{{ name }} está atacando a Pikachu</p>
    </div>
    <div class="avatar">
      <h3>{{ name }}</h3>
      <img :src="src" :alt="altImage" />
    </div>
  </div>
</template>

<style scoped>
.pokemon {
  display: grid;
  grid-template-columns: 1fr 256px;
  gap: 30px;
  padding: 25px;
}

.dialog {
  font-family: 'Press Start 2P', cursive;
  font-size: 1.5rem;
  background: grey;
  padding: 25px;
}

h3 {
  font-family: 'Play', sans-serif;
  font-size: 3rem;
}

img {
  width: 256px;
}
</style>
