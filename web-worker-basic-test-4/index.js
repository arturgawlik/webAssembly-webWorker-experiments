const input = document.querySelector("input");
const output = document.querySelector("output");
const buttonCPP = document.querySelector("button#CPP");

let start = null;

const blobUrl = URL.createObjectURL(
  new Blob(
    [
      `let wasmInstancePromise = null;

      self.addEventListener("message", onMessage);
      
      async function onMessage(e) {
        switch (e.data.type) {
          case "factorial":
            await calcFactorial(e);
            break;
          case "wasmModule":
            reciveWasmModule(e);
            break;
          default:
            throw new Error("unknown message");
        }
      }
      
      async function calcFactorial(e) {
        const wasmInstance = await wasmInstancePromise;
      
        const factorial = wasmInstance.exports.factorial;
        const { integer } = e.data;
        const result = factorial(integer);
        self.postMessage({ result });
      }
      
      function reciveWasmModule(e) {
        wasmInstancePromise = WebAssembly.instantiate(e.data.wasmModule);
      }
      `,
    ],
    { type: "text/javascript" }
  )
);
const worker = new Worker(blobUrl);
worker.addEventListener("error", (e) => {
  console.error(e);
});
worker.addEventListener("message", (e) => {
  const result = e.data.result;
  const time = performance.now() - start;
  output.textContent = `c++ done in ${time}ms: ${result}`;
});

const wasmModulePromise = WebAssembly.compileStreaming(fetch("factorial.wasm"));
let promiseSendToWorker = false;

buttonCPP.addEventListener("click", async () => {
  start = performance.now();

  if (!promiseSendToWorker) {
    const wasmModule = await wasmModulePromise;
    worker.postMessage({
      type: "wasmModule",
      wasmModule,
    });
  }

  worker.postMessage({ type: "factorial", integer: parseInt(input.value, 10) });
});
