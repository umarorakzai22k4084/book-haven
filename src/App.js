import { Routes, Route, Link, HashRouter } from 'react-router';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';

import "./App.css"
import LoginPage from './pages/LoginPage';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <HashRouter>
      <header>
        <nav>
          <h2><Link to='/'>BookHaven</Link></h2>
          {!user && <p><Link to='/login'>Login</Link></p>}
          {user && <div>
            <p>
              {user.username} &#x2022;
              <button onClick={() => setUser(null)}>Logout</button>
            </p>
          </div>
          }
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<HomePage user={user} />} />
        <Route path='/book/:id' element={<BookPage user={user} />} />
        <Route path='login' element={<LoginPage setUser={setUser} user={user} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
