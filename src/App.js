// import "./App.css";
import { Game } from "./components/Game";


const stageWidth = 800;
const stageHeight = 800;
function App() {


	return (

	

		<div className="App">

			<Game stageHeight={stageHeight} stageWidth={stageWidth}></Game>
		</div>
	
	);
}

export default App;
