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
          <Route
            path="/test/*"
            element={
              <>
                <div>Test</div>
                <Routes>
                  <Route path="shrek" element={<div>Shrek</div>} />
                </Routes>
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
