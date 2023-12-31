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
import { LESSON_1_5 } from "./pages/lessons/lesson-1-5";
import { LESSON_1_6 } from "./pages/lessons/lesson-1-6";
import { LESSON_1_7 } from "./pages/lessons/lesson-1-7";
import { LESSON_1_8 } from "./pages/lessons/lesson-1-8";
import { LESSON_1_9 } from "./pages/lessons/lesson-1-9";
import { LESSON_1_10 } from "./pages/lessons/lesson-1-10";

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
          <Route path="/lesson-1-5" element={<LESSON_1_5 />} />
          <Route path="/lesson-1-6" element={<LESSON_1_6 />} />
          <Route path="/lesson-1-7" element={<LESSON_1_7 />} />
          <Route path="/lesson-1-8" element={<LESSON_1_8 />} />
          <Route path="/lesson-1-9" element={<LESSON_1_9 />} />
          <Route path="/lesson-1-10" element={<LESSON_1_10 />} />
          <Route path="/about" element={<About />} />
          <Route path="/content" element={<Content />} />
          <Route path="/compiler" element={<Compiler />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
