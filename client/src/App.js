import './App.css';
import Main from './components/main';
import Header from './components/header';

function App() {
  return (
    <div className="App" style={mainWindow}>
       <Header/>
      <Main/>
    </div>
  );
}

export default App;

const mainWindow = {
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  overflow: "none"
}