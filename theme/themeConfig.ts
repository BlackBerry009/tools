// theme/themeConfig.ts
import { type ThemeConfig } from 'antd'

const themeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#18181b',
    colorPrimaryBg: '#c5c5c5'
  },
  components:{
    Input: {
      controlOutlineWidth: 1,
    }
  }
}

export default themeConfig
