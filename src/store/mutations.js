import * as types from './mutation-types'
const mutations = {
  [types.SETISFILTER] (state, val) {
    state.isFilter = val
  }
}
export default mutations
