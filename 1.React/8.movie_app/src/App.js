import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";


function App() {
 return (
 <Router>
   <Switch>
     <Route path="/movie/:id"> //router에 url이 변수를 받을 것이다라고 명시
        <Detail/> 
      </Route>
     <Route path="/">
       <Home/>
     </Route>
   </Switch>
 </Router>
 );
}

export default App;
