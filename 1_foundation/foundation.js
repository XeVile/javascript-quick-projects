let x = 5.1;
let y = 7.1112;
let p = 2;
let st = "Test ";

let [n, m] = ["3", "4"];

let result = (x + y + p) + st;
console.log("Mult:", x*y, " Exp:", x**p, " Mod:", y%p, " Div:", y/p, st + p, "Sooo" + x);
document.getElementById("found").innerHTML = result;
document.getElementById("found").innerHTML = n * m;

// assignments Module 1:
//

console.log(23 + 97);

result = (4+6+9) / 77;

let a = 10;
let b = 9 * a
console.log(a * 7)
console.log(b)

document.getElementById("found").innerHTML = b;

//q5
let max = 57;
let actual = max - 13;
let perc = actual/max;

const button = document.getElementById("greet");

function greet() {
  const name = prompt('Your name: ');
  alert(`Hello ${name}, nice!`);
}

button.addEventListener('click', greet);

const select = document.querySelector("select");
const pa = document.getElementById("quip");

select.addEventListener('change', setWeather);

function setWeather() {
  const choice = select.value;

  (choice === "sunny") ? pa.textContent = "What!" :
  (choice === "rainy") ? pa.textContent = "Yayyyyyy!" :
  pa.textContent = "So weather quic quick!";
}
