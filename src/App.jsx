
import './App.css'
import LanguageSwitcher from './components/LanguageSwitcher'
import { LanguageProvider } from './context/LanguageProvider'
import GoStudentBookingForm from './pages/Registiration'

function App() {

  return (
    <main>
      <LanguageProvider>
          <GoStudentBookingForm/>
      </LanguageProvider>
    </main>
  )
}

export default App
