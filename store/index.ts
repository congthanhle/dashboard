import type { UsersState, User } from '~/store/User/state'
import { createStore } from 'vuex'
import usersStore from '~/store/User'

export interface RootState {
  usersState: UsersState,
  userState: User
}

const store = createStore<RootState>({
  modules: {
    usersStore
  }
})

export default store

