<template>
  <v-app id="inspire">
    <v-loading :visible="$store.state.pageLoading"></v-loading>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app width="200">
      <v-card-text class="text-center">
        <v-avatar color="teal" size="86">
          <img src="https://cd-blog.oss-cn-shenzhen.aliyuncs.com/blog/avatar.jpg" alt />
        </v-avatar>
        <div class="text-h6">
          CD
          <!-- <v-icon>mdi-account-arrow-left-outline</v-icon> -->
        </div>
      </v-card-text>
      <v-divider class="mx-2" />
      <v-list dense>
        <template v-for="item in sidebar">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="item.link">
              <v-list-item-action v-if="child.icon">
                <v-icon :color="child.color|| ''">{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.link">
            <v-list-item-action>
              <v-icon :color="item.color|| ''">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-divider class="mx-2" />
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="font-weight-black">
          <v-icon size="50" color="pink">mdi-panda</v-icon>CD的个人小站
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span
        class="d-none d-lg-flex "
        :class="$vuetify.theme.dark?'text-shining':'text-magic'"
      >挑兮达兮，在城阙兮。一日不见，如三月兮！</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleSnackbar">
        <v-icon>mdi-calendar-range</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-switch v-model="$vuetify.theme.dark" hide-details></v-switch>
    </v-app-bar>
    <v-main>
      <v-container
        fluid
        :class="['background', $vuetify.theme.dark? 'background-dark':'background-light']"
      >
        <nuxt />
      </v-container>
    </v-main>
    <!-- 时间提示 -->
    <v-snackbar v-model="snackbar" content-class="text-center" color="blue" top centered rounded>
      {{ dateNow() }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink lighten-2" icon text v-bind="attrs" @click="handleSnackbar">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <back-top />
  </v-app>
</template>

<script>
import moment from "moment";
import BackTop from "@/components/BackTop";
import sidebar from "./sidebar";
export default {
  name: "cd-layout",
  components: {
    BackTop,
  },
  props: {
    source: String,
  },
  data: () => ({
    snackbar: false,
    dialog: false,
    drawer: null,
  }),
  computed: {
    sidebar() {
      return sidebar;
    },
  },
  watch: {
    $pageInit(val) {
      this.pageInit = val;
    },
  },
  methods: {
    handleSnackbar() {
      this.snackbar = !this.snackbar;
    },
    dateNow() {
      return "当前时间为：" + moment().format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  &.background {
    height: 100%;
    background-repeat: no-repeat;

    background-size: 100% 100%;

    background-attachment: fixed;
  }
  &.background-light {
    background-image: url("/layout.png");
  }
  &.background-dark {
    background-image: url("/dark1.png");
  }
}
.white {
  position: absolute;
  left: -10px;
  width: 100%;
  height: 1px;
  background: #000;
  z-index: 4;
  animation: whiteMove 10s ease-out infinite;
}

.text-shining {
  animation: shining 0.1s alternate infinite;
  font-family: "Pacifico", cursive;
  text-transform: uppercase;
  color: #cce7f8;
}

.text-magic {
  font-weight: 700;
  position: relative;
  animation: move 0.95s infinite;
  background-image: linear-gradient(#67f714, #fcf6f6);
  background-clip: text;
}
@keyframes shining {
  from {
    text-shadow: 0 0 6px rgba(182, 211, 207, 0.9), 0 0 30px #1e1e1e,
      0 0 12px rgba(15, 115, 223, 0.5), 0 0 21px rgba(15, 115, 223, 0.9),
      0 0 34px rgba(15, 115, 223, 0.8), 0 0 54px rgba(15, 115, 223, 0.9);
  }
  to {
    text-shadow: 0 0 6px rgba(182, 211, 207, 1), 0 0 30px #1e1e1e,
      0 0 12px rgba(15, 115, 223, 0.6), 0 0 22px rgba(15, 115, 223, 0.8),
      0 0 38px rgba(15, 115, 223, 0.9), 0 0 60px rgba(15, 115, 223, 1);
  }
}

@keyframes move {
  10% {
    top: -0.4px;
    left: -1.1px;
  }
  20% {
    filter: hue-rotate(-90deg);
    top: 0.4px;
    left: -0.2px;
  }
  30% {
    filter: hue-rotate(0);
    left: 0.5px;
  }
  40% {
    top: -0.3px;
    left: -0.7px;
  }
  50% {
    filter: blur(1px);
    left: 0.2px;
  }
  60% {
    filter: blur(0);
    top: 1.8px;
    left: -1.2px;
  }
  70% {
    top: -1px;
    left: 0.1px;
  }
  80% {
    top: -0.4px;
    left: -0.9px;
  }
  90% {
    left: 1.2px;
  }
  100% {
    left: -1.2px;
  }
}
</style>