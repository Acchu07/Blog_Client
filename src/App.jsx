import { useState } from 'react'
import Login from './components/LoginForm.jsx'
import SignUpForm from './components/signUpForm.jsx'
import DisplayButton from './components/button.jsx'


function App() {
  const [displayView, setDisplayView] = useState(0);

  function showView(){
    switch (displayView) {
      case 1:
        return <Login />;
      case 2:
        return <SignUpForm />;
      default:
        return null;
    }
  }


  return (
    <>
      <DisplayButton setDisplayView={setDisplayView} displayView={displayView}>Login</DisplayButton>
      <DisplayButton setDisplayView={setDisplayView} displayView={displayView}>Sign Up</DisplayButton>
      {showView()}
      <p>Posts are Here</p>:

    </>
  )
}

export default App
