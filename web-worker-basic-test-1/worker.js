console.log("spawned at: ", new Date().valueOf());
const importObject = {};
WebAssembly.instantiateStreaming(fetch("factorial.wasm"), importObject).then(
  (resultObject) => {
    const factorial = resultObject.instance.exports.factorial;

    self.addEventListener("message", onMessage);
    console.log("after message listening: ", new Date().valueOf());

    function onMessage(e) {
      const { integer } = e.data;
      const result = factorial(integer);
      self.postMessage({ result });

      // remove listner
      self.removeEventListener("message", onMessage);
    }
  }
);
