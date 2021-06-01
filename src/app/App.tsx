import './App.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import TodoPage from './components/page/todo-page.component';

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <BrowserRouter>
            <Switch>
              <Route exact path='/' component={TodoPage} />
              <Redirect to="/" />
            </Switch>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
