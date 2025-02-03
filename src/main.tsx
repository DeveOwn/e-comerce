import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './contexts/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
    <AppProvider>
      <App />
    </AppProvider>
)
