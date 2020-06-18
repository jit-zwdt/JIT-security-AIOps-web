import AssetsList from '@/views/assetsManager/assetsList/assetsList.vue'

export default [
  {
    path: 'assetsList',
    name: 'assetsList',
    component: AssetsList,
    meta: {
      title: '资产信息'
    }
  }
]

export const assets = {
  assetsManager: {
    assetsList: '/assetsManager/assetsList'
  }
}
