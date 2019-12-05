const moment = require('moment');
const outputDir = process.env.outputDir === 'dist/prod' ? `${process.env.outputDir}/${moment().format('YYYYMMDD')}` : process.env.outputDir;
//资源路径配置
const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = {
    //配置输出文件目录
        publicPath: process.env.baseUrl,
        outputDir: outputDir,
        productionSourceMap: false,
    //配置别名
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('~@', resolve('src/assets'))
            .set('_v', resolve('src/views'))
            .set('_c', resolve('src/components'));
    },
    //配置potcss
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("autoprefixer")({
                        overrideBrowserslist: ['Android >=4.0','iOS >= 7']
                    }),
                    // transfer px to rem
                    // require("postcss-pxtorem")({
                    //     rootValue: 16,  //换算的基数
                    //     selectorBlackList: ["van"], //要忽略的选择器并保留为px
                    //     propList: ["*"], //可以从px更改为rem的属性
                    //     minPixelValue: 2
                    // }),
                    require("postcss-px-to-viewport")({
                        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
                        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
                        selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
                        mediaQuery: false // 允许在媒体查询中转换`px`
                    }),
                    // require("cssnano")({
                    //     preset: "advanced",
                    //     autoprefixer: false,
                    //     "postcss-zindex": false
                    // })

                ]
            }
        }
    },

}