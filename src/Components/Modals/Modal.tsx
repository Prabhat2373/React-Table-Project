import React, { useEffect, useState } from "react";
interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: JSX.Element;
}


export default function Modal({ isOpen, setIsOpen, children }: ModalProps) {

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
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-out transition-all duration-700 flex-col"
                        style={{ animationIterationCount: 1, animationFillMode: 'backwards' }}
                    >

                        <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white">
                            {/*content*/}
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex justify-end w-full"
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                            {children}

                        </div>

                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}