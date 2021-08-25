export const MAX_QUESTIONS = 4;
export const ALPHA_ANSWERS = new Array(MAX_QUESTIONS)
    .fill(1)
    .map((_, i) => String.fromCharCode(65 + i));
