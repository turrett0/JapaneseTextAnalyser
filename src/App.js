// import JishoAPI from 'unofficial-jisho-api';
import './App.css';
import { SearchProvider } from './Context/SearchContext/SearchContext'
import CustomForm from './Components/CustomForm/CustomForm';
import WordCards from './Components/WordCards/WordCards';
import Header from './Components/Header/Header'





function App() {
  // kuromojiDBrequest()


  return (
    <SearchProvider>
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
    </SearchProvider>
  );
}

export default App;
