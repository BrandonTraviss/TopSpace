export default function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage
// const min = 1;
// const max = 10;
// const randomNum = getRandomNumber(min, max);
// console.log(`Random number between ${min} and ${max}: ${randomNum}`);
