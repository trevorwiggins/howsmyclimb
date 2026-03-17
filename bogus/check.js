<button onClick ={() => {
    console.log("Button Clicked");
    alert("Button Clicked");
}}
>Click Me</button>

const person = {
    name: "John",
    age: 30,
    isMarried: false
};

const {name, age, isMarried} = person;

const person2 = {...person, name: "Jane"};
let names = ["John", "Jane", "Jack", "John", "John"];
const names2 = [...names, "Jill"];

names.map((name) => {
    return name + "1";
});

names.filter((name) => {
    return name !== "John";
});
