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
    <main ref="canvas_aria">
      <v-stage ref="stage" :config="configKonva">
        <v-layer ref="layer">
          <v-shape :config="configWorldLines" />
          <v-circle
            ref="particles"
            v-for="item in list"
            :key="item.id"
            :config="{
              x: item.x,
              y: item.y,
              radius: item.r,
              fill: item.f,
              opacity: 0.1,
            }"
          ></v-circle>
        </v-layer>
      </v-stage>
    </main>
  </div>
</template>

<script>
const WORKER_URL = "./build/worker.js";
export default {
  data: function () {
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
      configKonva: {},
      configWorldLines: {},
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
    // this.drawSpaceTime();
  },
  methods: {
    Installition: async function () {
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

    Running: function () {
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
        this.run_status = "runing error";
        console.log(e);
      }
    },

    TurnOff: async function () {
      this.worker.postMessage({ status: "close" });
      this.installDisabled = false;
      this.runDisabled = false;
      this.install_status = "Disconnected";
      this.run_status = "Not Running";
    },

    WorkerLoad: async function () {
      this.install_status = "Step 2: Loading Worker";
      return new Promise(function (resolve, reject) {
        let worker = new Worker(WORKER_URL);
        worker.postMessage({ status: "load" });
        worker.onmessage = (e) => {
          console.log(e.data);
          resolve(worker);
        };
        worker.onerror = function (err) {
          reject(err);
        };
      });
    },

    delay: async function (delayInms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    },

    loadCanvasWindows: function (app_windows) {
      const height = app_windows.offsetHeight;
      const width = app_windows.offsetWidth;

      this.configKonva.width = width;
      this.configKonva.height = height;
      let out = {
        height: height,
        width: width,
      };
      return out;
    },
    drawWorldLines: function (windows) {
      return {
        sceneFunc: function (context, shape) {
          // X axis
          context.beginPath();
          context.moveTo(0, windows.height / 2);
          context.lineTo(windows.width, windows.height / 2);
          context.closePath();
          context.fillStrokeShape(shape);

          // Y axis
          context.beginPath();
          context.moveTo(windows.width / 2, 0);
          context.lineTo(windows.width / 2, windows.height);
          context.closePath();
          context.fillStrokeShape(shape);
        },
        fill: "white",
        stroke: "#ddd",
        strokeWidth: 1,
      };
    },
    loadCenterPoint: function (windows) {
      let pos = {
        x: windows.width / 2,
        y: windows.height / 2,
        r: 2,
        f: "#01b4b4",
      };
      this.list.push(pos);
    },

    drawSpaceTime: async function () {
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

      let windows = await this.loadCanvasWindows(app_windows);

      //Draw world line
      this.configWorldLines = await this.drawWorldLines(windows);

      // Draw +
      await this.loadCenterPoint(windows);
      this.sendWindowsWorker();
    },
    fullScreen: function () {
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
    sendWindowsWorker: function () {
      if (this.runDisabled) {
        let app_windows = this.$refs.canvas_aria;
        let windows = this.loadCanvasWindows(app_windows);
        this.worker.postMessage({ status: "windows-size", windows: windows });
      }
    },
    tlsConnection: function () {
      console.log("Start EventSource");
      var source = new EventSource("https://signaling.local/hello");
      source.onmessage = function (event) {
        console.log(event);
        console.log(event.data);
      };
    },
    tlsConnectionAPI: function () {
      console.log("Start EventSource");
      var source = new EventSource("https://signaling.local/api/hello");
      source.onmessage = function (event) {
        console.log(event);
        console.log(event.data);
      };
    },
    animatePoints: function () {
      const period = 5000;
      // in ms
      const particles = this.$refs.layer
        .getStage()
        .getChildren(function (node) {
          return node.getClassName() === "Circle";
        });
      const anim = new Konva.Animation(function (frame) {
        var scale = Math.sin((frame.time * 2 * Math.PI) / period) + 0.01;
        particles[particles.length - 1].scale({ x: scale, y: scale });
      }, this.$refs.layer.getStage());
      anim.start();
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