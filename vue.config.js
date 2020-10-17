
module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      title: '',
      filename: 'index.html'
    },
    dashBaord: {
      entry: 'src/pages/DashBaord/main.ts',
      template: 'public/dashBaord.html',
      title: '大屏展示',
      filename: 'dashBaord.html'
    }
  },
}