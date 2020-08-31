const api = {
  login: '/login',
  index: '/index',
  regionManager: {
    list: '/regionManager/list'
  },
  assetsManager: {
    assetsList: '/assetsManager/assetsList'
  },
  sysManager: {
    // departmentManager/department
    getDepartment: '/sys/department/getDepartment/',
    getDepartmentInfos: '/sys/department/getDepartmentInfos',
    delDepartment: '/sys/department/delDepartment/',
    // departmentManager/departmentAdd
    addDepartment: '/sys/department/addDepartment',
    // departmentManager/vallidator.js
    checkDepartCode: '/sys/department/checkDepartCode/',
    // dictionaryManager/dictionary
    getDictionary: '/sys/dictionary/getDictionary',
    deleteDictionary: '/sys/dictionary/deleteDictionary/',
    deleteDictionaryItem: '/sys/dictionary/deleteDictionaryItem/',
    findDictionaryItemByDicId: '/sys/dictionary/findDictionaryItemByDicId',
    // dictionaryManager/dictionaryAdd
    addDictionary: '/sys/dictionary/addDictionary',
    findDictionaryById: '/sys/dictionary/findDictionaryById/',
    checkDictCode: '/sys/dictionary/checkDictCode/',
    checkDictName: '/sys/dictionary/checkDictName/',
    // dictionaryManager/dictionaryItemAdd
    checkItemText: '/sys/dictionary/checkItemText',
    addDictionaryItem: '/sys/dictionary/addDictionaryItem',
    findDictionaryItemById: '/sys/dictionary/findDictionaryItemById/',
    // menuManager/menu
    getMenus: '/sys/menu/getMenus',
    // roleManager/roleAdd
    getRole: '/sys/role/getRole/',
    addRole: '/sys/role/addRole',
    // roleManager/role
    getRoles: '/sys/role/getRoles',
    delRole: '/sys/role/delRole/',
    // roleManager/validators.js
    checkRoleName: '/sys/role/checkRoleName/',
    checkRoleSign: '/sys/role/checkRoleSign/',
    // userManager/user
    getUsers: '/sys/user/getUsers',
    getAllDepartment: '/sys/department/getAllDepartment',
    deleteUser: '/sys/user/deleteUser/',
    addUser: '/sys/user/addUser',
    // userManager/userAdd
    checkUserName: '/sys/user/checkUserName/',
    findUserById: '/sys/user/findUserById/'
  },
  main: {
    // Index.vue
    getMonitorTypeUsedInfo: '/homePage/getMonitorTypeUsedInfo',
    getTimeTop5ItemInfo: '/homePage/getTimeTop5ItemInfo/',
    getUserInfo: '/user/getUserInfo',
    getAlertdata: '/problem/getAlertdata'
  },
  refreshToken: '/refreshToken'
}
export default api
