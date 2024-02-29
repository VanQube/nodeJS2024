export default function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + 1);
}

console.log(getRandomNumber(1, 1000));