
import React, { useState, useEffect, useImperativeHandle } from 'react'
import blogservice from '../services/blogservice'
import Blog from './Blog'


const Blogs = React.forwardRef((props, ref) => {
    Blogs.displayName = 'Blogs'

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogservice.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }, [])

    const updateBlogs = () => {
        blogservice.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }


    useImperativeHandle(ref, () => {
        return {
            updateBlogs
        }
    })


    if (blogs) {
        return (
            <div>
                {blogs.map(blog => {
                    return (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={props.user}
                            updateBlogs={updateBlogs}
                            updateMessage={props.updateMessage}>
                        </Blog>
                    )
                })}
            </div>
        )
    } else {
        return <></>
    }

})



export default Blogs