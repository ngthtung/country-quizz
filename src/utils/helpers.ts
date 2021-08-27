import Vue from "vue";
import { MAX_QUESTIONS } from "@/utils/const";
import { CountryModel } from '@/models/modelChoice';
import countries from "../resources/countries.json";

const filterCountries: CountryModel[] = countries.filter(country => !!country.capital && !!country.name) as CountryModel[];
export const bus = new Vue();
export const getRandomInt = (max: number) : number => {
    return Math.floor(Math.random() * max);
}
export const getRandomQuestions = (): CountryModel[] => {
    let numQuestions: number[] = [];
    const _countries: CountryModel[] = filterCountries

    while(numQuestions.length < MAX_QUESTIONS) {
        let idxRandom: number = getRandomInt(_countries.length);
        if (!numQuestions.includes(idxRandom)) {
            numQuestions.push(idxRandom)
        }
    }

    return numQuestions.map((val) => _countries[val]);
}
