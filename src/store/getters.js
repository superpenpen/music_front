const getters = {
  sidebar: state => state.app.sidebar,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  roleId: state => state.user.roleId,
  roleName: state => state.user.roleName,
  menus: state => state.user.menus,
  permissions: state => state.user.permissions,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
