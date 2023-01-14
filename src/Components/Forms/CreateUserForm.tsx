import React from 'react'
import { useState } from 'react';
import { useCreateUserMutation } from '../../services/rtk/UserApi';

interface FormDataType { name: string, status: string, role: string, lastLogin: string }

const CreateUserForm = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [CreateUser, { isLoading: isFormLoading, isSuccess: FormSubmitted }] = useCreateUserMutation()
    const formData: FormDataType = {
        name: "",
        status: "",
        role: "",
        lastLogin: ""
    }
    const [responseBody, setResponseBody] = useState<FormDataType>(formData);
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { name, value } = event.target
        setResponseBody({ ...responseBody, [name]: value })
    }
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // console.log()
        CreateUser({ ...responseBody, lastLogin: new Date().toISOString() }).then(() => {
            setIsFormSubmitted(true)
        })
        //Form submission happens here

    }
    // if(FormSubmitted){
    //     window.location.reload()
    // }

    return (
        <>
            <form onSubmit={onSubmitHandler}>

                <div className="relative p-6 flex-auto">
                    <div className="flex flex-col justify-center gap-6">
                        <input className="border border-gray-400 rounded-md outline-none " id="name" type="text" placeholder="name" name="name" onChange={(e) => inputChangeHandler(e)} />
                        {/* <input className="border border-gray-400 rounded-md outline-none " id="role" type="" placeholder="role" name="role" onChange={(e) => inputChangeHandler(e)} /> */}
                        <select name="role" id="role" onChange={(e) => {
                            inputChangeHandler(e)
                            console.log(e?.target?.value)
                        }}>
                            <option value="admin" >Admin</option>
                            <option value="user">User</option>
                        </select>
                        <input className="border border-gray-400 rounded-md outline-none " id="status" type="text" placeholder="status" name="status" onChange={(e) => inputChangeHandler(e)} />
                        <input className="border border-gray-400 rounded-md outline-none hidden" id="lastLogin" value={Date.now()} type="text" placeholder="last login" name="lastLogin" onChange={(e) => inputChangeHandler(e)} />
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"

                        >
                            {isFormLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateUserForm