import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Create from './Components/Create';
import Update from './Components/Update';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
	<BrowserRouter>
		<NavBar/>
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/create" element={<Create/>} />
			<Route path="/update" element={<Update/>} />
			<Route path="*" element={<Home/>} />
		</Routes>
	</BrowserRouter>
    </div>
  );
}

export default App;
