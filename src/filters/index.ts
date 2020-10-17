import Vue from 'vue'
import * as filters from './fn'

Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as any)[key])
})
