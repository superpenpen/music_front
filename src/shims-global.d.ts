
declare module 'echarts' {
  const echarts: any;
  export default echarts;
}


namespace process {
  export const env: {
    VUE_APP_REQUESTURL: string,
    NODE_ENV: string
  }
}