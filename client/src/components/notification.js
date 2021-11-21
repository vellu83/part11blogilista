import React from 'react'
const Notification = ({ message }) => {

    if (message){
        return (
            <div className={message.type}>
                <h3>{message.text}</h3>
            </div>
        )
    }
    else {
        return <></>
    }


}

export default Notification
