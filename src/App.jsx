import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import DetailPage from '@/pages/DetailPage'
import VocabPage from '@/pages/VocabPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<DetailPage />} />
        <Route path='/vocab' element={<VocabPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App