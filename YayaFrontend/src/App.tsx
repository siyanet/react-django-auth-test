import { Provider } from "react-redux";
import Dashboard from "./components/DashboardPage";
import { store } from "./store/store";



function App() {
 
  return (
     <Provider store={store}>
      <Dashboard/>
    </Provider>
    
  );
}

export default App;

