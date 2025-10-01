import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ImageConverter from './pages/ImageConverter'
import ImageEditor from './pages/ImageEditor'
import DevTools from './pages/DevTools'
import DocumentViewer from './pages/DocumentViewer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Contact from './pages/Contact'
import About from './pages/About'
import Blog from './pages/Blog'
import TestPage from './pages/TestPage'

// Main App Component
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/converter" element={<ImageConverter />} />
          <Route path="/editor" element={<ImageEditor />} />
          <Route path="/dev-tools" element={<DevTools />} />
          <Route path="/viewer" element={<DocumentViewer />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
