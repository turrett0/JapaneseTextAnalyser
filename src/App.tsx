import "./App.scss";
import {Route, Routes, HashRouter} from "react-router-dom";
import Layout from "./pages/Home/Layoyt";
import TextAnalysis from "./pages/TextAnalysis/TextAnalysis";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TextAnalysis />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
