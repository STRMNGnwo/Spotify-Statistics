import Home from "./components/Home"
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Profile from "./components/Profile"

function App() {
  return (
    <>
    <Router>
       <Switch>
         <Route exact path="/" component={Home}/>
          
       <Route exact path="/profile" component={Profile}/>
        
       
       </Switch>
    

    </Router>
     
    </>
  );
}

export default App;
