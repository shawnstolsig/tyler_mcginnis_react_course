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
const Articles = React.lazy( () => import('./Articles') )

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
            <Route path="/:teamName" exact component={TeamPage} />
            <Route path="/:teamName/articles" component={Articles} />
            <Route render={ () => <h1 className="text-center">404: Page not found</h1> } />
          </Switch>
        </React.Suspense>
        
      </div>
    </Router>

  );
}

export default App;
