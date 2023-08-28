import React, {useContext} from "react";
import DifficultyPage from "./Pages/DifficultyPage";
import LoginPage from "./Pages/LoginPage";
import SudokuPage from "./Pages/SudokuPage";
import ScorePage from "./Pages/ScorePage";
import Header from "./Components/Header";
// import State from "./ContextAPI/State";
// import Context from "./ContextAPI/Context"
import { UserProvider } from './context/UserContext';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App () {

  const initialEasy = [
    [6, -1, 9, 1, 5, -1, -1, 3, -1],
    [7, 4, -1, -1, -1, 6, -1, 9, 1],
    [3, -1, -1, 9, 4, -1, -1, 6, 5],
    [2, -1, -1, 7, 1, 3, 9, -1, -1],
    [-1, 9, 3, -1, -1, 2, 5, -1, 7],
    [-1, 1, 7, 5, -1, -1, 6, -1, 3],
    [5, -1, 2, 4, -1, 9, 1, -1, -1],
    [-1, 3, -1, -1, 7, 1, -1, 5, 6],
    [-1, 7, 8, -1, 6, -1, 3, 4, -1],
  ];

  const initialMed = [
    [-1, -1, -1, -1, 9, -1, -1, -1, 1],
    [-1, -1, 7, -1, 6, -1, -1, 3, 8],
    [-1, 3, -1, -1, 2, 1, -1, 7, 5],
    [-1, -1, 2, -1, 5, 9, -1, 6, -1],
    [7, 5, 9, -1, -1, -1, 3, 8, 4],
    [-1, 4, -1, 3, 7, -1, 5, -1, -1],
    [5, 1, -1, 2, 3, -1, -1, 9, -1],
    [4, 9, -1, -1, 8, -1, 7, -1, -1],
    [2, -1, -1, -1, 4, -1, -1, -1, -1]
  ];

  const initialHard = [
    [-1, 9, -1, 1, -1, -1, -1, 3, -1],
    [-1, 1, 2, 5, -1, 4, -1, -1, -1],
    [6, -1, 5, -1, -1, -1, -1, -1, 4],
    [3, 6, 7, 2, 1, -1, 5, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 8, -1, 4, 5, 3, 1, 6],
    [1, -1, -1, -1, -1, -1, 6, -1, 2],
    [-1, -1, -1, 6, -1, 3, 8, 5, -1],
    [-1, 8, -1, -1, -1, 1, -1, 7, -1],
  ];

  const scoreEasy = 500;
  const scoreMed = 600;
  const scoreHard = 700;
  
  // const a = useContext(Context);

return (
  <UserProvider>
  
    <Header />
    <Router>
      <Routes>
        <Route path= "/" element = {<LoginPage/>} />
        <Route path="/difficulty" element={<DifficultyPage />} />
        <Route
            path="/sudokuMedium"
            element={<SudokuPage initial={initialMed} score={scoreEasy}/>}
          />
          <Route
            path="/sudokuHard"
            element={<SudokuPage initial={initialHard} score={scoreMed}/>}
          />
          <Route
            path="/sudokuEasy"
            element={<SudokuPage initial={initialEasy} score={scoreHard}/>}
          />
          <Route path="/scores" element={<ScorePage />} />
      </Routes>
    </Router>
  </UserProvider>
);
}
export default App;