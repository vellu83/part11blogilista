import React from 'react'

const Logout = ({ user, setUser }) => {

    const handlelogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    if (user) {
        return (
            <div>
                <p>{user.name} logged in
                    <button on onClick={handlelogout}> logout </button> </p>
            </div >
        )

    } else {
        return <></>
    }
}

export default Logout
