<template>
    <div class="box-model">
        <button
            :class="bindingClass(answer)"
            class="choices"
            v-for="{ alpha, answer } in getAnswers"
            :key="alpha"
            @click="pickAnswer(answer, alpha)"
        >
            <div class="answer">
                <span class="alpha_answer">{{ alpha }}</span>
                <span class="answer_string ellipsis">{{ answer }}</span>
            </div>
        </button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ChoicesType, CountryModel } from "../models/modelChoice";
import { ALPHA_ANSWERS, MAX_ANSWERS, MAX_QUESTIONS } from "../utils/const";
import {bus, getRandomQuestions, getRandomInt} from "../utils/helpers";

@Component({
    props: {
        countries: {
            type: Array,
        },
        question: {
            type: Object,
        },
        nextStep: {
            type: Function,
        },
    },
})
export default class Choices extends Vue {
    countries!: CountryModel[];
    question!: CountryModel;
    nextStep!: Function;
    currentAnswer: string | null = null;
    showResult: boolean = false;
    isCorrect: boolean = false;
    isWrong: boolean = false;

    mounted() {
        bus.$on('resetChoices', this.resetChoices);
    }
    resetChoices() {
        this.currentAnswer = null;
        this.showResult = false;
    }
    isActive(answer: string) {
        return this.currentAnswer === answer;
    }
    get getAnswers(): ChoicesType[] {
        let randomQues = getRandomQuestions();
        const ans = randomQues.map((country) => {
            return country.name
        });
        let idxRandom: number = getRandomInt(MAX_ANSWERS);
        ans[idxRandom] = this.question.name;
        return ALPHA_ANSWERS.map((alpha, idx) => {
            return {
                alpha,
                answer: ans[idx],
            };
        });
    }
    bindingClass(answer: string): string[] {
        return [
            this.isActive(answer) ? 'isActive' : '',
            this.checkIsCorrect(answer) ? 'isCorrect': '',
            this.checkIsWrong(answer) ?'isWrong': '',
        ]
    }
    pickAnswer(answer: string) {
        this.currentAnswer = answer;
        setTimeout(() => {
            this.showResult = true;
            this.nextStep(this.checkIsCorrect(answer));
            // this.$emit('nextStep', this.isCorrect(answer))
        }, 500);
    }
    checkIsCorrect(answer: string): boolean {
        return this.showResult && answer === this.question.name;
    }
    checkIsWrong(answer: string) {
        if (answer === this.currentAnswer && this.showResult) {
            return this.currentAnswer !== this.question.name;
        }
    }
}
</script>

<style lang="scss" scoped>
.box-model {
    .question {
        padding-left: 32px;
        font-size: 24px;
        color: #2f527b;
        font-weight: bold;
    }
    .isActive {
        background-color: #f9a826 !important;
        color: white !important;
        font-weight: bold;
    }
    .isCorrect {
        background-color: #60bf88 !important;
        color: white !important;
    }
    .isWrong {
        background-color: #ea8282 !important;
        color: white !important;
    }
    .choices {
        background-color: white;
        border-radius: 10px;
        border: 2px solid rgba(96, 102, 208, 0.7);
        height: 56px;
        margin: 0px 32px 25px;
        color: rgba(96, 102, 208, 0.8);

        &:hover {
            cursor: pointer;
        }
        .answer {
            display: flex;
            font-weight: bold;
            text-align: left;
            .alpha_answer {
                margin-left: 19px;
            }
            .answer_string {
                margin-left: 45px;
            }
            .ellipsis {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}
</style>
