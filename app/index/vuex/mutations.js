import * as types from './types'

export default{
  [types.SET_CURRENT_USER](state,payload){
      state.currentUser = payload;
  }
}