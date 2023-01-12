import React from 'react'
import { useDeleteUserMutation } from "../services/rtk/UserApi";
const DeleteUserFn = (id: number) => {
    const [DeleteUser] = useDeleteUserMutation();
    DeleteUser(id).then(() => console.log("SUCCESS")).catch((err) => err?.message)
}

export default DeleteUserFn