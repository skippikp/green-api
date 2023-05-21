import './App.scss';
import Router from './Router/Router';
import { useAppSelector } from './store';

function App() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="App">
      <Router isAuthorized={!!user} />
    </div>
  );
}

export default App;
