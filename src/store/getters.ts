import { GetterTree } from 'vuex'
import { RootState } from './index'

const getters: GetterTree<RootState, RootState> = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  nickName: state => state.user.nickName,
  userId: state => state.user.userId,
  roleId: state => state.user.roleId,
}
export default getters