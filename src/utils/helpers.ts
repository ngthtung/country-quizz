import Vue from "vue";

export const getRandomInt = (max: number) : number => {
    return Math.floor(Math.random() * max);
}
export const bus = new Vue();
