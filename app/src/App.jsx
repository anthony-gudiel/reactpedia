import './components/header.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from './components/header';
import {Home} from './pages/home/home';
import { About } from './pages/about/about';
import { Resources } from './pages/resources/resources';
import { Contact } from './pages/contact/contact';
import { Content } from './pages/content/content';
import { LESSON_1_1 } from './pages/content/lesson-1-1';
import { LESSON_1_2 } from './pages/content/lesson-1-2';
import { LESSON_1_3 } from './pages/content/lesson-1-3';
import {LESSON_1_2_ANSWERS} from './pages/content/lesson-1-2-answers'

function App() {
  return (
    <div className="App">

      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/content' element={<Content />} />
          <Route path='/lesson-1-1' element={<LESSON_1_1 />} />
          <Route path='/lesson-1-2' element={<LESSON_1_2 />} />
          <Route path='/lesson-1-2-answers' element={<LESSON_1_2_ANSWERS />} />
          <Route path='/lesson-1-3' element={<LESSON_1_3 />} />
          <Route path='/about' element={<About />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>

      </Router>

    </div>
  ); 
}

export default App
