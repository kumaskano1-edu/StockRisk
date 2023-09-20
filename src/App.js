import { MyArrayProvider } from './state/context';
import { MyLoadingProvider } from './state/loading';
import Dashboard from "./dashboard/Dashboard"
// import Testing from "./testing/Testing"
import "./App.css"
function App() {

  return (
    <div className="App">    
    <MyLoadingProvider>
      <MyArrayProvider>
        <Dashboard />
      </MyArrayProvider>
    </MyLoadingProvider>
    </div>
  );
}

export default App;
