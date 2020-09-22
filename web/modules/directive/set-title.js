export const setTitle = {
  inserted(el, binding) {
    if (binding.value) {
      document.title = binding.value
    } else if (binding.value === '') {
      document.title = 'CD的博客小窝'
    }
  },
  update(el, binding, vnode, oldVnode) {
    const { value } = binding
    if (value) {
      document.title = value
    } else if (value === '') {
      document.title = 'CD的博客小窝'
    }
  }
}
