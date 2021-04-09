import * as types from './types'

export default{
    [types.SET_CURRENT_USER]({commit},payload){
        commit(types.SET_CURRENT_USER,payload);
    }
}