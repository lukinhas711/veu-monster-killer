new Vue({
  el: '#app',
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100
  },
  computed: {
    hasResult() {
      return this.playerLife === 0 || this.monsterLife === 0;
    }
  },
  methods: {
    getRandon(min, max) {
      const value = Math.random() * (max - min) + min
      return Math.round(value)
    },
    hit(atr, min, max, special) {
      const plus = special ? 5 : 0
      const hit = this.getRandon(min + plus, max + plus)
      this[atr] = Math.max(this[atr] - hit, 0)
    },
    heal(min, max){
      const heal = this.getRandon(min, max)
      this.playerLife = Math.min(this.playerLife + heal, 100)
    },
    healAndHurt() {
      this.heal(10, 15)
      this.hit('playerLife', 7, 12, false)
    },
    startGame() {
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
    },
    giveUp() {
      this.running = false;
    },
    attack(special){
      this.hit('playerLife', 7, 12, false)
      this.hit('monsterLife', 5, 10, special)

    }
  },
  watch: {
    hasResult(value) {
      if (value) this.running = false;
    }
  }
})
