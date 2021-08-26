export const MAX_QUESTIONS = 4;
export const MAX_ANSWERS = 4;
export const ALPHA_ANSWERS = new Array(MAX_ANSWERS)
    .fill(1)
    .map((_, i) => String.fromCharCode(65 + i));
export enum MODE {
    PLAYING = 'playing',
    RESULT = 'result',
};
