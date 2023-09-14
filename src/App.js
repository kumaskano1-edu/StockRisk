import { MyArrayProvider } from './state/context';
import Dashboard from "./dashboard/Dashboard"
// import Testing from "./testing/Testing"
import "./App.css"
function App() {

  return (
    <div className="App">    
    <MyArrayProvider>
      <Dashboard />
    </MyArrayProvider>
    </div>
  );
}

export default App;
