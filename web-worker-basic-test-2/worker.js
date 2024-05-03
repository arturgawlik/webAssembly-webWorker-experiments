const importObject = {};
const wasmReadyPromise = WebAssembly.instantiateStreaming(
  fetch("factorial.wasm"),
  importObject
);

self.addEventListener("message", onMessage);

function onMessage(e) {
  wasmReadyPromise.then((resultObject) => {
    const factorial = resultObject.instance.exports.factorial;
    const { integer } = e.data;
    const result = factorial(integer);
    self.postMessage({ result });

    // remove listner
    self.removeEventListener("message", onMessage);
  });
}
