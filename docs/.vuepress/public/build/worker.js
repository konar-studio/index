importScripts('wasm_exec.js');

const WASM_URL = "wasm.wasm";
const go = new Go();

onmessage = async ({
  data
}) => {
  let messageType = data.status

  if (messageType === "load") {
    postMessage('Worker loading');
    // server = await wsConnect();
    var wasm;

    if ('instantiateStreaming' in WebAssembly) {
      WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
        wasm = obj.instance;
        go.run(wasm);
      })
    } else {
      fetch(WASM_URL).then(resp =>
        resp.arrayBuffer()
      ).then(bytes =>
        WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
          wasm = obj.instance;
          go.run(wasm);
        })
      )
    }

    postMessage('Wasm loading');
  }
  if (messageType === "run") {
    postMessage('Runing');
    server.onmessage = ({
      data
    }) => {
      if (data.length > 5) {
        // send raw data to golang
        loadSignal(data)
      }
    };
  }
  if (messageType === "windows-size") {
    let windows = JSON.stringify(data.windows)
    setWindowsSize(windows)

  }
  if (messageType === "close") {
    server.close();
    postMessage('Closing');
  }
}

const wsConnect = async () => {
  return new Promise(function (resolve, reject) {
    let server = new WebSocket("ws://surface-scanner.local:81/", [
      "arduino",
    ]);
    server.onopen = function () {
      resolve(server);
    };
    server.onerror = function (err) {
      reject(err);
    };
  });
}

// incoming function for send points to deawer stage (canvas)
function sendScreenUpdate(bs64) {
  if (bs64.length > 10) {

    postMessage(bs64);
  }
}