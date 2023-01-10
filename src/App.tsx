import React, { useEffect, useState } from 'react';
import './App.css';
import DataTable from './Components/DataTable';
// import NewTable from './Components/NewTable';
import { UserTableColumns } from './Components/UserTableColumns';
import { TableData } from './Helper/TableData';
import { useGetAllUsersQuery } from './services/rtk/UserApi';
import { DumyData } from './DumyData';

function App() {
    const [Users, setUsers] = useState([]);
    const { data: AllUsers } = useGetAllUsersQuery("")
    console.log("USERS", Users)
    console.log(AllUsers);

    useEffect(() => {
        setUsers(AllUsers)
    }, [AllUsers])


    return (
        <>
            <div className="my-auto mx-10">
                <DataTable columns={UserTableColumns} data={AllUsers?.payload ?? DumyData} />
            </div>
        </>
    );
}

export default App;
