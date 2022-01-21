// import JishoAPI from 'unofficial-jisho-api';
import './App.css';
import { SearchProvider } from './Context/SearchContext/SearchContext'
import CustomForm from './Components/CustomForm/CustomForm';
import Card from './Components/WordCards/WordCards';





function App() {
  // kuromojiDBrequest()


  return (
    <SearchProvider>
      {/* <Header /> */}
      <div className="App">
        <div className="container">
          <h1>JAPANESE TEXT ANALYSIER</h1>
          <CustomForm />
          <Card />
        </div>
      </div>
    </SearchProvider>
  );
}

export default App;
