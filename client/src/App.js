import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import AddBlog from './components/addBlog'
import Login from './components/login'
import Logout from './components/logout'
import Notification from './components/notification'

const App = () => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('userdata')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
        }
    }, [])

    const updateMessage = (message, type) => {
        setMessage({ text: message, type: type })
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const blogRef = useRef()

    return (
        <div>
            <Notification message={message}> </Notification>
            <Logout user={user} setUser={setUser}>
            </Logout>
            <Login
                setUser={setUser}
                updateMessage={updateMessage}
                user={user}
            ></Login>
            <AddBlog
                user={user}
                updateMessage={updateMessage}
                blogRef={blogRef}
            ></AddBlog>
            <Blogs user={user} ref={blogRef} updateMessage={updateMessage}>
            </Blogs>
        </div>
    )
}

export default App
