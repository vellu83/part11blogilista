import React, { useState } from 'react'
import loginservice from '../services/loginservice'

const Login = ({ setUser, updateMessage, user }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        setPassword('')
        setUsername('')
        try {
            const user = await loginservice.login(username, password)
            let userSTRING = JSON.stringify(user)
            window.localStorage.setItem('userdata', userSTRING)
            setUser(user)
            updateMessage(`${user.name } succesfully logged in`,'message')
        } catch (exeption) {

            updateMessage('wrong username or password','warning')

        }
    }
    if (!user) {
        return (
            <div>
                <strong> LOGIN:</strong>
                <form onSubmit={handleLogin}>
                    <div>
                        username:
                        <input type='text'
                            id='username'
                            value={username}
                            name="username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>

                    <div>
                        password:
                        <input type='text'
                            id='password'
                            value={password}
                            name="username"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit' id='submitlogin'>Login</button>


                </form>

            </div>
        )
    } else {
        return <></>
    }


}

export default Login