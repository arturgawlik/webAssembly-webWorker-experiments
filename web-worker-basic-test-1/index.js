const input = document.querySelector("input");
const output = document.querySelector("output");
const buttonCPP = document.querySelector("button#CPP");

buttonCPP.addEventListener("click", (e) => {
  const start = performance.now();
  console.log("spawning at: ", new Date().valueOf());
  const worker = new Worker("worker.js");
  console.log("after new Worker: ", new Date().valueOf());

  worker.addEventListener("error", onError);
  worker.addEventListener("message", onMessage);
  worker.postMessage({ integer: parseInt(input.value, 10) });
  console.log("after post message: ", new Date().valueOf());

  function onMessage(e) {
    const result = e.result;
    const time = performance.now() - start;
    output.textContent = `c++ done in ${time}ms: ${result}`;
  }

  function onError(e) {
    console.error(e);
  }
});
