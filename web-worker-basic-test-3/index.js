const input = document.querySelector("input");
const output = document.querySelector("output");
const buttonCPP = document.querySelector("button#CPP");

let worker = null;
let start = null;
const wasmModulePromise = WebAssembly.compileStreaming(fetch("factorial.wasm"));

buttonCPP.addEventListener("click", async () => {
  start = performance.now();

  if (!worker) {
    worker = new Worker("worker.js");
    worker.addEventListener("error", (e) => {
      console.error(e);
    });

    const wasmModule = await wasmModulePromise;
    worker.postMessage({
      type: "wasmModule",
      wasmModule,
    });
    worker.addEventListener("message", onMessage);

    function onMessage(e) {
      const result = e.data.result;
      const time = performance.now() - start;
      output.textContent = `c++ done in ${time}ms: ${result}`;
    }
  }

  worker.postMessage({ type: "factorial", integer: parseInt(input.value, 10) });
});
