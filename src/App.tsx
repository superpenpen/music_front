import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue/types/umd';
@Component
export default class App extends Vue {
  render(): VNode{
    return (<router-view />)
  }
}
