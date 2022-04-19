import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<div className="wrapper">
			<Router>
				<Header />
				<Main />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
