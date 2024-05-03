const input = document.querySelector("input");
const output = document.querySelector("output");
const buttonCPP = document.querySelector("button#CPP");

buttonCPP.addEventListener("click", (e) => {
  const start = performance.now();
  const worker = new Worker("worker.js");

  worker.addEventListener("error", onError);
  worker.addEventListener("message", onMessage);
  worker.postMessage({ integer: parseInt(input.value, 10) });

  function onMessage(e) {
    const result = e.data.result;
    const time = performance.now() - start;
    output.textContent = `c++ done in ${time}ms: ${result}`;
  }

  function onError(e) {
    console.error(e);
  }
});
