import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom'


import Navbar from './Navbar'
import Loading from './Loading'

const Home = React.lazy( () => import('./Home') )
const Players = React.lazy( () => import('./Players') )
const Teams = React.lazy( () => import('./Teams') )
const TeamPage = React.lazy( () => import('./TeamPage') )

function App() {


  return (
    <Router>
      <div className="">
        <Navbar />

        <React.Suspense fallback={Loading}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/players" component={Players} />
            <Route path="/teams" component={Teams} />
            <Route path="/:teamName" component={TeamPage} />
            <Route render={ () => <h1 className="text-center">404: Page not found</h1> } />
          </Switch>
        </React.Suspense>
        
      </div>
    </Router>

  );
}

export default App;
