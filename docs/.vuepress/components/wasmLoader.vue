<template>
  <div :class="is_full_screen ? 'full-screen app-windows' : 'app-windows'">
    <aside class="tools">
      <div class="button-input">
        <button v-on:click="Installition" :disabled="installDisabled">
          نصب نرم‌افزار
        </button>
        <span>{{ install_status }}</span>
      </div>
      <div class="button-input">
        <button v-on:click="Running" :disabled="runDisabled">
          اجرای نرم‌افزار
        </button>
        <span>{{ run_status }}</span>
      </div>
      <div class="button-input">
        <button v-on:click="TurnOff" :disabled="!runDisabled">
          غیرفعال سازی
        </button>
      </div>
      <div class="button-input">
        <button v-on:click="tlsConnection">حالت TLS</button>
      </div>
      <div class="button-input">
        <button v-on:click="tlsConnectionAPI">حالت TLS API</button>
      </div>
      <div class="button-input">
        <button v-on:click="fullScreen" v-if="is_full_screen">
          خروج از تمام‌صفحه
        </button>
        <button v-on:click="fullScreen" v-else>تمام‌صفحه</button>
      </div>
    </aside>
    <aside class="logger">
      <ol>
        <li v-for="log in logs" v-bind:key="log">{{ log.text }}</li>
      </ol>
    </aside>
    <main>
      <canvas ref="canvas_aria" id="mycanvas"
        >Your browser doesn't appear to support the canvas tag.</canvas
      >
    </main>
  </div>
</template>

<script>
const WORKER_URL = "/wasm/loader/worker.js";
export default {
  props: ["wApp_name"],
  data: function() {
    return {
      installDisabled: false,
      runDisabled: false,
      worker: null,
      install_status: "Disconnected",
      run_status: "Not Running",
      message: "",
      x_input: 4,
      y_input: 5,
      final_value: 0,
      logs: [],
      list: [],
      is_full_screen: false,
    };
  },
  created() {
    window.addEventListener("resize", this.drawSpaceTime);
  },
  destroyed() {
    window.removeEventListener("resize", this.drawSpaceTime);
  },
  mounted() {
    // console.log(this.wApp_name);
    // console.log(this.worker_file);
    // this.drawSpaceTime();
  },
  methods: {
    Installition: async function() {
      try {
        this.worker = await this.WorkerLoad();
        this.install_status = "Installition Complete !";
        this.installDisabled = true;
      } catch (e) {
        console.log(e);
        this.install_status = "Installition Error";
        this.logs.push({ text: "Installition Error" });
      }
    },

    Running: function() {
      try {
        this.worker.postMessage({ status: "run" });
        this.run_status = "App is Running";
        this.runDisabled = true;
        this.sendWindowsWorker();
        this.worker.onmessage = (e) => {
          try {
            let shape = decodeURIComponent(escape(window.atob(e.data)));
            let point = JSON.parse(shape);
            this.list.push(point);
            this.animatePoints();
          } catch (e) {
            // console.log(e);
          }
        };
      } catch (e) {
        this.run_status = "running error";
        console.log(e);
      }
    },

    TurnOff: async function() {
      this.worker.postMessage({ status: "close" });
      this.installDisabled = false;
      this.runDisabled = false;
      this.install_status = "Disconnected";
      this.run_status = "Not Running";
    },

    WorkerLoad: async function() {
      this.install_status = "Step 2: Loading Worker";
      const wApp_name = this.wApp_name;
      return new Promise(function(resolve, reject) {
        let worker = new Worker(WORKER_URL);
        worker.postMessage({ status: "load", wApp_name: wApp_name });
        worker.onmessage = (e) => {
          console.log(e.data);
          resolve(worker);
        };
        worker.onerror = function(err) {
          reject(err);
        };
      });
    },

    delay: async function(delayInms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    },

    drawSpaceTime: async function() {
      // check for full screen !
      try {
        this.is_full_screen = await JSON.parse(localStorage.wasm_full_screen);
      } catch (e) {
        // console.log(e);
      }
      let app_windows = await this.$refs.canvas_aria;

      if (!app_windows) {
        return;
      }

      this.sendWindowsWorker();
    },
    fullScreen: function() {
      if (this.is_full_screen) {
        this.is_full_screen = false;
        localStorage.wasm_full_screen = false;
        document.body.classList.remove("body-fullscreen");
      } else {
        this.is_full_screen = true;
        localStorage.wasm_full_screen = true;
        document.body.classList.add("body-fullscreen");
      }
      this.drawSpaceTime();
    },
    sendWindowsWorker: function() {
      if (this.runDisabled) {
        let app_windows = this.$refs.canvas_aria;
        let windows = this.loadCanvasWindows(app_windows);
        this.worker.postMessage({ status: "windows-size", windows: windows });
      }
    },
    tlsConnection: function() {
      console.log("Start EventSource");
      var source = new EventSource("https://signaling.local/hello");
      source.onmessage = function(event) {
        console.log(event);
        console.log(event.data);
      };
    },
    tlsConnectionAPI: function() {
      console.log("Start EventSource");
      var source = new EventSource("https://signaling.local/api/hello");
      source.onmessage = function(event) {
        console.log(event);
        console.log(event.data);
      };
    },
  },
};
</script>

<style>
.app-windows {
  display: grid;
  grid-template-areas:
    "tools main main main main main"
    "logger main main main main main";
  grid-gap: 5px;
  padding: 3px;
  background: #f5f7f9;
  width: 100%;
  height: 500px;
}

.full-screen {
  position: fixed;
  bottom: 0;
  top: 0;
  z-index: 1000;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
}
.body-fullscreen {
  overflow: hidden !important;
}
.app-windows > aside,
.app-windows > main {
  background-color: rgba(255, 255, 255, 0.8);
}

.app-windows aside {
  grid-area: aside;
}

.app-windows .tools {
  grid-area: tools;
}

.app-windows .logger ol {
  display: flex;
  flex-direction: column-reverse;
}

.app-windows .logger {
  grid-area: logger;
  font-size: 11px;
  overflow-y: scroll;
  text-align: right;
}

.app-windows main {
  grid-area: main;
}
.app-windows main > div {
  position: absolute;
}
.app-windows #canvas {
  width: 100%;
  background: #ddd;
  height: 100%;
}

.app-windows .tools-input {
  text-align: right;
  white-space: nowrap;
  direction: ltr;
}

.app-windows .tools input {
  padding: 4px;
  margin: 1px;
  border: none;
  width: 80px;
  background: white;
  margin-right: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.app-windows .button-input {
  display: grid;
  text-align: center;
  border-bottom: 1px solid #f5f7f9;
}
.app-windows .button-input span {
  padding: 0;
  margin: -3px;
  font-size: 0.7em;
}
.app-windows .tools button {
  display: grid;
  padding: 5px 0;
  margin: 2px;
  border: 1px solid #ddd;
}
</style>
