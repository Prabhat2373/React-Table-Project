import React from 'react';
import './App.css';
import UserTable from './Components/UserTable';
import NewTable from './Components/NewTable';

function App() {
  return (
    <>
      <div>
        <h1 className="font-semibold text-center">
          Hello
        </h1>
        {/* <UserTable /> */}
        <NewTable/>
      </div>
    </>
  );
}

export default App;
