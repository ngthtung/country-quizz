<template>
    <div class="box-model">
        <img
            class="adventure-img"
            src="../assets/undraw_adventure_4hum 1.svg"
        />
        <!-- <img src='./assets/undraw_winners_ao2o 2.svg' /> -->
        <p class="question">
            {{ getQuestion }}
        </p>
        <Choices
            :countries="countries"
            :question="question"
            :nextStep="nextStep"
        />
        <button
            class="next-question-btn"
            @click="nextQuestion"
            v-if="showNextQuestion"
        >
            Next
        </button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Choices from "./Choices.vue";
import { MAX_QUESTIONS } from "../utils/const";
import { getRandomInt, bus } from "../utils/helpers";

@Component({
    components: {
        Choices,
    },
    props: {
        countries: {
            type: Array,
        },
    },
})
export default class BoxAnswser extends Vue {
    countries!: any;
    showNextQuestion: boolean = false;
    score: number = 0;
    question: any = {};

    get getQuestion(): string {
        const indRandom: number = getRandomInt(MAX_QUESTIONS);
        this.question = this.countries[indRandom];
        return `${this.countries[indRandom].capital} is the capital of`;
    }
    nextStep(isCorrect: boolean) {
        if (isCorrect) {
            this.score++;
        }
        this.showNextQuestion = true;
    }
    nextQuestion() {
        this.showNextQuestion = false;
        this.$emit("nextRound");
        this.resetChoices();
    }
    resetChoices() {
        bus.$emit('resetChoices')
    }
}
</script>

<style lang="scss" scoped>
.box-model {
    width: 464px;
    background-color: white;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    .question {
        padding-left: 32px;
        font-size: 24px;
        color: #2f527b;
        font-weight: bold;
    }
    .adventure-img {
        margin-left: auto;
        margin-top: -80px;
        width: 160px;
    }
    .next-question-btn {
        background-color: #f9a826;
        color: white;
        border: white;
        height: 56px;
        box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
        border-radius: 12px;
        margin-left: auto;
        margin-right: 32px;
        margin-bottom: 32px;
        width: 116px;
        font-weight: bold;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
