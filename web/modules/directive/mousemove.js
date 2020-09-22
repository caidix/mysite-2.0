export default {
  bind(el, binding, vnode) {
    el.initX = 0;
    el.initY = 0;
  },
};

class MouseMove {
  constructor(dom) {
    this.dom = dom;
    this.onmousedown = null;
    this.onmousemove = null;
    this.onmouseup = null;

    this.init();
  }
  init() {}
  handleMousedown() {
    this.dom.onmousedown = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      const pageX = e.offsetLeft;
      const pageY = e.offsetTop;
      const x = clientX - pageX;
      const y = clientY - pageY;
    };
    this.dom.onmousemove = (e) => {
      console.log("触发鼠标拖动");
    };
    this.dom.onmouseup = (e) => {
      console.log("触发鼠标抬起");
    };
  }
}
