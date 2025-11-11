import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9epiazve',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
    appId: 'qp0s2yz7igdq9hw0xlj54h8d',
  }
})
