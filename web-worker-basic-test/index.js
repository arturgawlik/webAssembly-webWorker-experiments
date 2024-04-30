const input = document.querySelector("input");
const output = document.querySelector("output");
const buttonCPP = document.querySelector("button#CPP");

let worker = null;

buttonCPP.addEventListener("click", () => {
  e.preventDefault();
  if (!worker) {
    const start = performance.now();
    worker = new Worker("worker.js");
    worker.addEventListener("message", (e) => {
      const result = e.result;
      const time = performance.now() - start;
      output.textContent = `c++ done in ${time}ms: ${result}`;
    });
  }

  worker.postMessage({ integer: parseInt(input.value, 10) });
});
