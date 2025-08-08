<template>
  <div class="ue-communication-demo">
    <span>UE通信测试，需填写发布好的ue地址</span>
    <div
      class="pixel-streaming-container"
      ref="pixelStreamingContainer"
      :class="{ loaded: !loading }"
    >
      <button @click="sendMsgToUE2">发消息给UE</button>
    </div>
  </div>
</template>

<script>
import {
  Config,
  PixelStreaming
} from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.3";
import {
  Application,
  PixelStreamingApplicationStyle
} from "@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.3";

export default {
  name: "PixelStreamingVue2",
  props: {
    ss: {
      type: String,
      default: "ws://127.0.0.1:80/" //这里是ue的地址
    }
  },
  data() {
    return {
      loading: true,
      STATE: {
        stream: null,
        application: null
      }
    };
  },
  methods: {
    initPixelStreaming() {
      // 控制UI样式
      const PixelStreamingApplicationStyles =
        new PixelStreamingApplicationStyle({
          customStyles: {
            "#uiFeatures": {
              display: "none"
            }
          }
        });
      PixelStreamingApplicationStyles.applyStyleSheet();

      // 像素流播放配置
      const config = new Config({
        useUrlParams: true,
        initialSettings: {
          ss: this.ss,
          AutoConnect: true,
          AutoPlayVideo: true,
          StartVideoMuted: true,
          MinQP: 30,
          XRControllerInput: false,
          GamepadInput: false,
          TouchInput: false,
          HoveringMouse: true,
          HoveringMouseMode: true,
          SuppressBrowserKeys: false
        }
      });

      const stream = new PixelStreaming(config);
      const application = new Application({
        stream,
        onColorModeChanged: (isLightMode) =>
          PixelStreamingApplicationStyles.setColorMode(isLightMode)
      });

      // 重写 onPlayStream 添加 loading 状态
      const onPlayStream = application.onPlayStream.bind(application);
      application.onPlayStream = (...args) => {
        onPlayStream(...args);
        this.loading = false;
        this.$emit("loaded");
      };

      // 添加到 DOM
      this.$refs.pixelStreamingContainer.appendChild(application.rootElement);
      this.STATE.stream = stream;
      this.STATE.application = application;

      // 监听消息
      stream.addResponseEventListener("handle_responses", (data) => {
        console.log("Received message:", data);
        this.$emit("receiveMessage", data);
      });
    },

    // 对外接口：发送消息给 UE
    sendMsgToUE(payload) {
      console.log("Sending message to UE:", payload);
      if (!this.STATE.stream) return;
      this.STATE.stream.emitUIInteraction(payload);
    },
    sendMsgToUE2() {
      console.log("Start message to UE...");
      const json = {
        code: 1,
        msg: "ue test111"
      };
      this.sendMsgToUE(json);
    }
  },
  mounted() {
    this.initPixelStreaming();
  }
};
</script>

<style scoped>
.pixel-streaming-container {
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  min-height: 100px; /* 最小高度 放置不可见 */
}
.pixel-streaming-container.loaded {
  opacity: 1;
}
</style>
