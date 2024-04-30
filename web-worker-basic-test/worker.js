const importObject = {};
const wasmPromise = WebAssembly.instantiateStreaming(
  "factorial.wasm",
  importObject
);

self.addEventListener("message", async (e) => {
  const { integer } = e.data;
  const resultObject = await wasmPromise;
  const factorial = resultObject.instance.exports.factorial;
  const result = factorial(integer);

  self.postMessage({ result });
});
