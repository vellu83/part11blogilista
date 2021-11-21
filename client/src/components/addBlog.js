import React, { useState,useRef } from 'react'
import blogservice from '../services/blogservice'
import Togglable from './togglable'


const AddBlog = ({ updateMessage, user, blogRef }) => {
    const buttonRef = useRef()
    const [blogdetails, setBlogdetails] = useState({ title: '', author: '', url: '' })


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await blogservice.createNew(user, blogdetails)
            setBlogdetails({ title: '', author: '', url: '' })
            updateMessage(`succsesfully added ${res.title} by ${res.author}`,'message')
            blogRef.current.updateBlogs()

        } catch (exeption) {
            updateMessage( exeption.message,'warning')
        }
    }

    if (user) {
        return (
            <Togglable buttonLabel={'Create new blog'} ref={buttonRef} id='createblog'>
                <div>
                    <strong> <h2>Create new:</h2></strong>
                    <form onSubmit={handleSubmit} id='addblogform'>
                        <div>
                            title:
                            <input type="text"
                                id='title'
                                value={blogdetails.title}
                                name="title"
                                onChange={({ target }) => setBlogdetails({ ...blogdetails, title: target.value })}
                            />
                        </div>

                        <div>
                            author:
                            <input type='text'
                                id='author'
                                value={blogdetails.author}
                                name='author'
                                onChange={({ target }) => setBlogdetails({ ...blogdetails, author: target.value })}
                            />
                        </div>

                        <div>
                            url:
                            <input type='text'
                                value={blogdetails.url}
                                id='url'
                                name='url'
                                onChange={({ target }) => setBlogdetails({ ...blogdetails, url: target.value })}
                            />
                        </div>
                        <button type='submit' id='submitblog'>Create</button>


                    </form>

                </div>
            </Togglable>
        )
    } else {
        return <></>
    }


}

export default AddBlog