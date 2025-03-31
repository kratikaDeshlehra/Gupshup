import React, { useEffect, useState } from 'react'
import NavLinks from './components/NavLinks'
import Chatbox from './components/Chatbox'
import Chatlist from './components/Chatlist'
import Login from './components/Login'
import Register from './components/Register'
import { auth } from './Firebase/firebase'
import ResetPassword from './components/ResetPassword'

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [showChatlist, setShowChatlist] = useState(false);



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
        <NavLinks setShowChatlist={setShowChatlist} setSelectedUser={setSelectedUser} />

        {(window.innerWidth >= 1024 ? (
          <>
            <Chatlist setSelectedUser={setSelectedUser} />
            <Chatbox selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          </>

        ) : (
          <>   {showChatlist && !selectedUser && (
            <div className="w-full md:w-auto">
              <Chatlist setSelectedUser={(user) => {
                setSelectedUser(user);
                setShowChatlist(false);
              }} />
            </div>
          )}

            {selectedUser && (
              <div className="w-full">
                <Chatbox
                  selectedUser={selectedUser}
                  setSelectedUser={() => {
                    setSelectedUser(null);
                    setShowChatlist(true);
                  }}
                />
              </div>
            )}   </>


        ))}

      </div>) : (<div>
        {isLogin ? isReset ? (<ResetPassword setIsLogin={setIsLogin} setIsReset={setIsReset} />)
          : (<Login isLogin={isLogin} isReset={isReset} setIsReset={setIsReset} setIsLogin={setIsLogin} />) : (<Register setIsLogin={setIsLogin} />)}

      </div>)}
    </div>
  )
}

export default App

