import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // <-- Changed this
import App from './App'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* <-- Changed this */}
      <App />
    </HashRouter>
  </React.StrictMode>,
)
