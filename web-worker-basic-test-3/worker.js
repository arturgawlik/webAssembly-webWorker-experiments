let wasmInstancePromise = null;

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
