import './components/header.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from './components/header';
import {Home} from './pages/home/home';
import { About } from './pages/about/about';
import { Resources } from './pages/resources/resources';
import { Contact } from './pages/contact/contact';
import { Content } from './pages/content/content';

function App() {
  return (
    <div className="App">

      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/content' element={<Content />} />
          <Route path='/about' element={<About />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>

      </Router>

    </div>
  ); 
}

export default App
