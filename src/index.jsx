import { createRoot } from 'react-dom/client'
import Routes from './routes/AppRoutes'

import './assets/css/index.css'
import './assets/css/iconfont.css'
import './assets/css/luckysheet.css'
import './assets/css/plugins.css'
import './assets/css/pluginsCss.css'
// import './assets/js/plugin.js'
// import './assets/js/luckysheet.umd.js'
import './assets/css/misc.css'

const element = document.getElementById('app')
const root = createRoot(element)
root.render(<Routes />)
