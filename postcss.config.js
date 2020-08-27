module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 1rem 的大小
      rootValue: 37.5,
      // 把那些属性的px转成rem
      propList: ['*']
    }
  }
}
