import type { Module } from 'vuex/types/index.js'
import type { UsersState } from '~/store/User/state'
import state from '~/store/User/state'
import getters from '~/store/User/getters'
import mutations from '~/store/User/mutations'
import actions from '~/store/User/actions'
import type { RootState } from '~/store/index'

const productsModule: Module<UsersState, RootState> = {
  state,
  getters,
  mutations,
  actions
}

export default productsModule
