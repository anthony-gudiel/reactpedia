import "./components/header.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./pages/home/home";
import { About } from "./pages/about/about";
import { Compiler } from "./pages/compiler/compiler";
import { LESSON_1_1 } from "./pages/lessons/lesson-1-1";
import { LESSON_1_2 } from "./pages/lessons/lesson-1-2";
import { LESSON_1_3 } from "./pages/lessons/lesson-1-3";
import { Videos } from "./pages/videos/videos";
import { Content } from "./pages/resources/content";
import { Quizzes } from "./pages/quizzes/quizzes";
import { LESSON_1_4 } from "./pages/lessons/lesson-1-4";

function App() {
  document.title = "Learn React!";
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/lesson-1-1" element={<LESSON_1_1 />} />
          <Route path="/lesson-1-2" element={<LESSON_1_2 />} />
          <Route path="/lesson-1-3" element={<LESSON_1_3 />} />
          <Route path="/lesson-1-4" element={<LESSON_1_4 />} />
          <Route path="/about" element={<About />} />
          <Route path="/content" element={<Content />} />
          <Route path="/compiler" element={<Compiler />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
