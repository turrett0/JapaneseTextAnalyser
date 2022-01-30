// import JishoAPI from 'unofficial-jisho-api';
import './App.css';
import { SearchProvider } from './Context/SearchContext/SearchContext'
import CustomForm from './Components/CustomForm/CustomForm';
import WordCards from './Components/WordCards/WordCards';
import Header from './Components/Header/Header';
import WordModal from './Components/WodrModal/WordModal';
import {WordModalProvider} from './Context/WordModalContext/WordModalContext';





function App() {
  // kuromojiDBrequest()


  return (
    <SearchProvider>
      <WordModalProvider>
      <WordModal/>
      <Header />
      <div className="App">
        <div className="container">
          <section className="main">
            <div className="main-inner">
              <CustomForm />
          <WordCards />
            </div>
          </section>
        </div>
      </div>
      </WordModalProvider>
    </SearchProvider>
  );
}

export default App;
