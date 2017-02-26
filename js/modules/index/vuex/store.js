/**
 * Created by yi on 2017-01-06.
 */
import Vuex from 'Vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// 创建一个对象来保存应用启动时的初始状态
const state = {

};

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
