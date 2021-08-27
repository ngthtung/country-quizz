<template>
    <div class="container">
        <div class="content">
            <div class="title-quiz">COUNTRY QUIZZ</div>
            <BoxAnswser :countries="getContries" @playAgain="playAgain"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoxAnswser from "./components/BoxAnwser.vue";
import { CountryModel } from "./models/modelChoice";
import { getRandomQuestions } from "./utils/helpers";

@Component({
    components: {
        BoxAnswser,
    },
})
export default class App extends Vue {
    countries: CountryModel[] = getRandomQuestions();;

    get getContries() {
        return this.countries;
    }

    playAgain() {
        this.countries = getRandomQuestions();
    }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}
html, body {
    height: 100%;
}
body {
    font-family: Poppins,serif;
    font-style: normal;
    margin: 0;
}
button {
    font-family: Poppins,serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 27px;
}
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-image: url("./assets/background.png");
    background-size: cover;
    .content {
        margin: 0 auto;
        max-width: 5%;
        min-width: 25%;
    }
    .title-quiz {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 36px;
        color: white;
    }
}
</style>
