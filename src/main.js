import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import tools from './utils/index'
import bridge from './utils/bridge'
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
  Field, NavBar,Tab,Tabs,Cell, CellGroup, Button, Dialog, PasswordInput, Popup, NumberKeyboard, Uploader,Overlay,Loading,PullRefresh,List
} from 'vant'
Vue.use(Field).use(NavBar).use(Tab).use(Tabs).use(Cell).use(CellGroup).use(Button).use(Dialog).use(PasswordInput).use(Popup).use(NumberKeyboard).use(Overlay).use(Loading)
    .use(PasswordInput).use(Uploader).use(PullRefresh).use(List);

Vue.config.productionTip = true;
Vue.prototype.tools = tools;
Vue.prototype.bridge = bridge;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
/*
 * @动态改变页面标题
 * */
router.afterEach((to, from) => {
  if(to.meta.name){
    document.title = to.meta.name;
  }
})



