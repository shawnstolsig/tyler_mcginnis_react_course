import { BrowserRouter as Router, Link, Route } from 'react-route-dom'

// app code here
// the following JSX is returned by App component

<Router>
    {/* nav bar */}
    <div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/settings'>Settings</Link></li>
        </ul>

    {/* routes */}
    <Route exact path='/' component={HomeComponent}></Route>
    <Route path='/about' component={AboutComponent}></Route>
    <Route path='/settings' component={SettingsComponent}></Route>
    </div>

</Router>

<Route path="/settings/:topicId" component={Topic} />

<Route path='/about' component={(props) => <AboutComponent {...props} extraProp={extraPropName}>}</Route>    1