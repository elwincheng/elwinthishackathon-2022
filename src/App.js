import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
		<BrowserRouter>
		<NavBar />
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/signin" element={<Login />}/>
			</Routes>
		</BrowserRouter>
  );
}

export default App;
