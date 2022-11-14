import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import MovieList from './component/MovieList';

function App() {

  return (<>
    <Router>
      <Routes>
        <Route exact path="/" element={<MovieList navigate={Navigate} />}></Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
