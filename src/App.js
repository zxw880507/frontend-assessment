import CardList from "./components/CardList";
import "./styles/App.css";
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const windowSize = useWindowSize();

  return (
    <div className="App">
      <CardList windowSize={windowSize} />
    </div>
  );
}

export default App;
