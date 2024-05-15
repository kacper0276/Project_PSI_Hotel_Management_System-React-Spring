import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer'
import Layout from './Layout/Layout'

function App() {
  const header = (
    <Header>
      <p>Header</p>
    </Header>
  )

  const content = (
    <>
      <Routes>
        <Route path='/' exact element={<h1>Strona główna</h1>} />
      </Routes>
    </>
  )

  const footer = <Footer />

  return (
    <Router>
      <Layout header={header} content={content} footer={footer} />
    </Router>
  ) 
}

export default App;
