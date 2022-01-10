import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="text" />
        <button> Register </button>
      </div>
      <div className="login">
        <h1>Registration</h1>
        <input type="text" placeholder="Username..." />
        <input type="password" placeholder="Password..." />
        <button> Register </button>
      </div>
    </div>
  );
}

export default App;
