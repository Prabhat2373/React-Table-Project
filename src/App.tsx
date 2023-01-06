import React from 'react';
import './App.css';
import DataTable from './Components/DataTable';
// import NewTable from './Components/NewTable';
import { UserTableColumns } from './Components/UserTableColumns';
import { TableData } from './Helper/TableData';

function App() {
  const data = [
    {
        email: "aohn.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]

    },{
        email: "aohn.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "aohn.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "female",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    },{
        email: "john.doe@example.com",
        alias: "John Doe",
        gender: "Male",
        manager: true,
        teamsManaged: [1, 2, 3]
        
    }
];
  return (
    <>
      <div>
        <h1 className="font-semibold text-center">
          Hello
        </h1>
        <DataTable columns={UserTableColumns} data={TableData}/>
        {/* <NewTable/> */}
      </div>
    </>
  );
}

export default App;
