
import './iconfont/iconfont.css'

import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { VNode } from 'vue/types/umd';

@Component
export default class IconFont extends Vue {
    @Prop({ type: String }) type!: string;
    beforeDestroy() { }
    render(): VNode {
            return (<i class={`iconfont icon-${this.type}`} />)
    }
}
