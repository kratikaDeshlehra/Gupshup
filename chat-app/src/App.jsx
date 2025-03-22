import React, { useEffect, useState } from 'react'
import NavLinks from './components/NavLinks'
import Chatbox from './components/Chatbox'
import Chatlist from './components/Chatlist'
import Login from './components/Login'
import Register from './components/Register'
import { auth } from './Firebase/firebase'

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div>
      {user ? (<div className='flex lg:flex-row flex-col items-start w-[100%]'>
        <NavLinks />
        <Chatlist />
        <Chatbox />
      </div>) : (<div>
        {isLogin ? (<Login isLogin={isLogin} setIsLogin={setIsLogin} />) : (<Register isLogin={isLogin} setIsLogin={setIsLogin}  />)}

      </div>)}
    </div>
  )
}

export default App

