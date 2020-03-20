import * as types from './mutation-types'
const mutations = {
  [types.SET_ISFILTER] (state, val) {
    state.isFilter = val
  },
  [types.SET_STUDENT_ID] (state, val) {
    state.studentId = val
  }
}
export default mutations
