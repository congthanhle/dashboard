import type { GetterTree } from 'vuex/types/index.js'
import type { UsersState} from '~/store/User/state'
import type { RootState } from '~/store/index'

const getters: GetterTree<UsersState, RootState> = {
  USERS: (state: UsersState) => state.users,
  USER: (state: UsersState) => state.user
}

export default getters;
