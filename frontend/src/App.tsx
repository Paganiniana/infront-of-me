import { useState } from 'react'
import './App.css'

import AuthContext from './context/AuthStatus'
import { registerAuthListener, getCurrentAuth, LocalUser } from './firebase/auth';

import Authenticate from './pages/Authenticate';
import Viewer from './pages/Viewer';

function App() {

  let [currentUser, setCurrentUser] = useState<LocalUser>(getCurrentAuth());
  registerAuthListener((user) => setCurrentUser(user));

  return (
    <AuthContext.Provider value={currentUser}>
      <div className="root">
          { currentUser ? <Viewer />
              : <Authenticate /> }
      </div>
    </AuthContext.Provider>
  )
}

export default App
