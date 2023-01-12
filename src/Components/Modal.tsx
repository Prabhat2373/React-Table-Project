import React, { useEffect, useState } from "react";
import { useCreateUserMutation } from "../services/rtk/UserApi";
interface ModalProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormDataType { name: string, status: string, role: string, lastLogin: string }

export default function Modal({ isOpen, setIsOpen }: ModalProps) {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [CreateUser, { isLoading: isFormLoading }] = useCreateUserMutation()
    const formData: FormDataType = {
        name: "",
        status: "",
        role: "",
        lastLogin: ""
    }
    const [responseBody, setResponseBody] = useState<FormDataType>(formData);
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setResponseBody({ ...responseBody, [name]: value })
    }
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(responseBody)
        CreateUser(responseBody).then(() => {
            setIsFormSubmitted(true)
        })
        //Form submission happens here

    }
    useEffect(() => {
        console.log("Modal is Mounted");
        return (() => {
            console.log("Modal is Unmounted");
        })

    })
    return (
        <>
            {isOpen ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-out transition-all duration-700 "
                        style={{ animationIterationCount: 1, animationFillMode: 'backwards' }}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <form action="#" onSubmit={onSubmitHandler}>

                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Add User
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <div className="flex flex-col justify-center gap-6">
                                            <input className="border border-gray-400 rounded-md outline-none " id="name" type="text" placeholder="name" name="name" onChange={(e) => inputChangeHandler(e)} />
                                            <input className="border border-gray-400 rounded-md outline-none " id="role" type="text" placeholder="role" name="role" onChange={(e) => inputChangeHandler(e)} />
                                            <input className="border border-gray-400 rounded-md outline-none " id="status" type="text" placeholder="status" name="status" onChange={(e) => inputChangeHandler(e)} />
                                            <input className="border border-gray-400 rounded-md outline-none " id="lastLogin" type="text" placeholder="lastLogin" name="lastLogin" onChange={(e) => inputChangeHandler(e)} />
                                        </div>

                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"

                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}