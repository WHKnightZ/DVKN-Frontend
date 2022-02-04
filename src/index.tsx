import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { configureStore } from 'store'
import App from './App'
import { theme } from 'configs/theme'
import { loading } from 'configs/extensions'
import { BrowserRouter as Router } from 'react-router-dom'
import './i18n'
import 'assets/scss/index.scss'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Suspense fallback={loading}>
      <Provider store={configureStore}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Suspense>
  </ThemeProvider>,
  document.getElementById('root')
)
