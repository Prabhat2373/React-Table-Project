import React from 'react'
interface Props {
    title: string;
    message: string;
}

const SuccessModal = ({ title, message }: Props) => {
    return (
        <div>
            <div>
                <h1>{title ?? "NO TITLE"}</h1>
            </div>
            <div>
                <p>{message ?? "NO MESSAGE"}</p>
            </div>
        </div>
    )
}

export default SuccessModal