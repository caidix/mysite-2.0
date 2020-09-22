import Vue from "vue";
import Main from "./main.vue";
let MessageConstructor = Vue.extend(Main);

let seed = 1;
let instance;
let instances = [];

const Message = function (options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }
  let id = "cdmessage_" + seed++;
  let onClose = options.onClose;
  options.onClose = function () {
    return Message.close(id, onClose);
  };
  instance = new MessageConstructor({
    data: options,
  });
  instance.id = id;

  instance.$mount();
  document.querySelector("#__layout").appendChild(instance.$el);

  if (options.offset && typeof options.offset !== "number") {
    window ? window.console.warn("offet value must be number!") : "";
  }
  let verticalOffset = options.offset || 20;
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  instances.push(instance);
  return instance;
};

const msgType = ["success", "info", "warning", "error"];
msgType.map((item) => {
  Message[item] = (options) => {
    options = options || {};
    if (typeof options === "string") {
      options = {
        message: options,
      };
    } else if (!options.type) {
      options.type = item;
    }
    return Message(options);
  };
});

Message.close = function (id, fn) {
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (instances[i] && instances[i].id === id) {
      index = i;
      removedHeight = instances[i].$el.offsetHeight;

      if (typeof fn === "function") {
        fn(instances[i]);
      }
      instances.splice(i, 1);
    }
  }
  /**
   * 经典判断：是否需要因为message的减少而进行top的位移
   * 1.若是不超过1个，则不发生位移
   * 2.未找到需要关闭的message
   * 3.当关闭的message是最后一个时
   */
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = 0; i < instances.length; i++) {
    const element = instances[i];
    element.$el.style["top"] =
      parseInt(element.$el.style["top"], 10) - removedHeight - 16 + "px";
  }
};
// 全局销毁
Message.closeAll = function () {
  //for (let i = 0; i < instances.length; i++)!!这样的for循环是错的，因为会随着close减少instances的数量
  for (let i = instances.length - 1; i > -1; i--) {
    instances[i].close();
  }
};
export default Message;
