import "./App.scss";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./pages/Home/Layoyt";
import TextAnalysis from "./pages/TextAnalysis/TextAnalysis";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TextAnalysis />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
