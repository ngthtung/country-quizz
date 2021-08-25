<template>
    <div class="container">
        <div class="content">
            <p class="title-quiz">COUNTRY QUIZZ</p>
            <BoxAnswser :countries="getContries" @nextRound="nextRound"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoxAnswser from "./components/BoxAnwser.vue";
import { getRandomInt } from "./utils/helpers";
import { MAX_QUESTIONS } from "./utils/const";
import countries from "./resources/countries.json";

@Component({
    components: {
        BoxAnswser,
    },
})
export default class App extends Vue {
    countries: any = null;
  
    beforeMount() {
        this.countries = this.getRandomQuestions();
    }
    getRandomQuestions() {
        let numQuestions: number[] = [];
        
        while(numQuestions.length < MAX_QUESTIONS) {
            console.log('asd')
            let idxRandom: number = getRandomInt(250)
            if (!numQuestions.includes(idxRandom)) {
                numQuestions.push(idxRandom)
            }
        }
      
        return numQuestions.map((val) => countries[val]);
    }
    get getContries() {
        return this.countries;
    }
    nextRound() {
        this.countries = this.getRandomQuestions();
    }
}
</script>

<style lang="scss">
body {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url("./assets/background.png");
    font-family: Poppins;
    font-style: normal;
}
button {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
}
.container {
    display: flex;
    justify-content: center;
    .content {
        margin: 0 auto;
    }
    .title-quiz {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 36px;
        color: white;
    }
}
</style>
