<template>
    <div class="box-model" :class="{
        'center': mode === MODE.RESULT
    }">
        <template v-if="mode === MODE.PLAYING">
            <img
                class="adventure-img"
                src="../assets/undraw_adventure_4hum 1.svg"
            />
            <!-- <img src='./assets/undraw_winners_ao2o 2.svg' /> -->
            <p class="question">{{ getQuestion }}</p>
            <Choices
                :countries="countries"
                :question="question"
                :nextStep="nextStep"
            />
            <button
                class="next-question-btn"
                @click="nextQuestion"
                v-if="showBtnNextQuestion"
            >
                Next
            </button>
        </template>
        <template v-if="mode === MODE.RESULT">
            <img src="../assets/undraw_winners_ao2o 2.svg" class="winner-img" />
            <p class="result-tag">Results</p>
            <p class="result-answers">
                You got <span class="score">{{ score }}</span> correct answers
            </p>
            <button class="btn-try-again" @click="playAgain">
                Try again
            </button>
        </template>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Choices from "./Choices.vue";
import { MAX_QUESTIONS, MODE } from "../utils/const";
import { bus } from "../utils/helpers";
import { CountryModel } from "@/models/modelChoice";

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
    countries!: CountryModel[];
    showBtnNextQuestion: boolean = false;
    score: number = 0;
    idxCurrentQuestion: number = 0;
    question: CountryModel = this.countries[this.idxCurrentQuestion];
    mode: string = MODE.PLAYING;
    readonly MODE = MODE;

    get getQuestion(): string {
        this.question = this.countries[this.idxCurrentQuestion];
        return `${
            this.countries[this.idxCurrentQuestion].capital
        } is the capital of`;
    }
    nextStep(isCorrect: boolean) {
        if (isCorrect) {
            this.score++;
        }
        this.showBtnNextQuestion = true;
    }
    nextQuestion() {
        this.showBtnNextQuestion = false;
        if (this.idxCurrentQuestion + 1 === MAX_QUESTIONS) {
            this.mode = MODE.RESULT;
            return;
        } else {
            this.idxCurrentQuestion++;
        }

        this.resetChoices();
    }
    playAgain() {
        this.$emit("playAgain");
        this.idxCurrentQuestion = 0;
        this.score = 0;
        this.mode = MODE.PLAYING;
    }
    resetChoices() {
        bus.$emit("resetChoices");
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
    &.center {
        align-items: center;
    }
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
    .winner-img {
        margin-top: 50px;
    }
    .result-tag {
        font-size: 48px;
        line-height: 72px;
        color: #1d355d;
        font-weight: bold;
        margin-bottom: 0px;
    }
    .result-answers {
        font-size: 18px;
        line-height: 27px;
        color: #1d355d;
        .score {
            color: #6fcf97;
            font-size: 30px;
            font-weight: bold;
        }
    }
    .btn-try-again {
        margin-top: 71px;
        margin-bottom: 33px;
        background-color: white;
        border: 2px solid #1d355d;
        box-sizing: border-box;
        border-radius: 12px;
        width: 209px;
        height: 62px;
        &:hover {
            cursor: pointer;
        }
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
