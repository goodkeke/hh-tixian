import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import tools from './utils/index'
import './style/index.scss'
import './plugins/extension'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import animate from 'animation.css'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(animate)
Vue.use(VueAwesomeSwiper, /* { default global options } */)
/*
 @按需引入vant组件
  */
import {
  Field
} from 'vant'
Vue.use(Field);

Vue.config.productionTip = true;
Vue.prototype.tools = tools;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
/*
 * @动态改变页面标题
 * */
router.beforeEach((to, from, next) => {
  if(to.meta.name){
    document.title = to.meta.name
  }
  next()
})



