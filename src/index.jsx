import { createRoot } from 'react-dom/client'
import Routes from './routes/AppRoutes'

import './assets/css/index.css'

const element = document.getElementById('app')
const root = createRoot(element)
root.render(<Routes />)
