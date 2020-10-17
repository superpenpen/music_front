import Vue from 'vue'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import store from '@/store'
import {
    TokenKey
} from './auth'




type flag = number
export interface ResponsePackage<T = any> {
    code: flag
    data: any
    msg?: string
}

const request: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_REQUESTURL, // api 的 VUE_APP_URL
    timeout: 60000, // request timeout 60秒
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

request.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (store.getters.token) {
            config.headers[TokenKey] = store.getters.token
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        console.groupCollapsed(response.config.url)
        console.log('request', response.request)
        console.log('response', response.data)
        console.groupEnd()
        return response
    },
    (error: AxiosError) => {
        console.log(error)
        Promise.reject(error)
    }
)

export default request
