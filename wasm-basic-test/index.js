const input = document.querySelector("input");
const output = document.querySelector("output");
const buttonCPP = document.querySelector("button#CPP");
const buttonJS = document.querySelector("button#JS");

const importObject = {};
const resultObject = await WebAssembly.instantiateStreaming(
  fetch("factorial.wasm"),
  importObject
);

const factorialWasm = resultObject.instance.exports.factorial;
const factialJS = (n) => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
};

buttonCPP.addEventListener("click", (e) => {
  e.preventDefault();
  const start = performance.now();
  const result = factorialWasm(parseInt(input.value, 10));
  const time = performance.now() - start;
  output.textContent = `c++ done in ${time}ms: ${result}`;
});

buttonJS.addEventListener("click", (e) => {
  e.preventDefault();
  const start = performance.now();
  const result = factialJS(parseInt(input.value, 10));
  const time = performance.now() - start;
  output.textContent = `js done in ${time}ms: ${result}`;
});
