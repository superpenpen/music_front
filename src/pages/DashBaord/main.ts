import Vue from 'vue';

import store from './store'
import 'normalize.css/normalize.css'
import './styles/index.scss'

import Header from './Header/index.vue';
import LeftContainer from './LeftContainer/index.vue';
import RightContainer from './RightContainer/index.vue';
import BottomContainer from './BottomContainer/index.vue';

Vue.config.productionTip = false;

declare global {
  interface Window {
    clickServerModelGroup: (isOpen: boolean) => void
    clickServerModel: () => void
    sceneReady: () => void
  }
}
// 3D场景 机箱展开
// window.clickServerModelGroup = function (isOpen) {
//   console.log('window.clickServerModelGroup', isOpen)
//   store.dispatch('setContainerHidden', isOpen)
// }
window.clickServerModel = function () {
  console.log('window.clickServerModel')
}
const HeaderVue = new Vue({
  store,
  render: (h) => h(Header),
})
const LeftContainerVue = new Vue({
  store,
  render: (h) => h(LeftContainer),
})
const RightContainerVue = new Vue({
  store,
  render: (h) => h(RightContainer),
})
const BottomContainerVue = new Vue({
  store,
  render: (h) => h(BottomContainer),
})
// loading加载
window.sceneReady = function () {
  HeaderVue.$mount('#Header');
  LeftContainerVue.$mount('#LeftContainer');
  RightContainerVue.$mount('#RightContainer');
  BottomContainerVue.$mount('#BottomContainer');
}


