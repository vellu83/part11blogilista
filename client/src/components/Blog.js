import React, { useState } from 'react'
import blogservice from '../services/blogservice'

// halusin yksittäisen blogin muutoksen renderöivän uudestaan ainoastaan kyseisen blogin (ei koko blogilistaa)
// tästä syystä blogin view nappulan ja like nappulan toiminnallisuus on toteutettu Blog komponentissa

const DeleteBtn = ({ user, blog, updateBlogs, updateMessage }) => {
    const deleteaction = async () => {
        if (window.confirm('are you sure??')) {
            await blogservice.removeBlog(user, blog)
            updateMessage('blog deleted!', 'message')
            updateBlogs()
        }
    }

    if (!user || !blog.user) return <> </>

    if (user.id.toString() === blog.user.id.toString()) {
        return (
            <button onClick={deleteaction} className='delete'>
                {' '}
                DELETE{' '}
            </button>
        )
    } else {
        return <> </>
    }
}

const Blog = ({ blog, user, updateBlogs, updateMessage }) => {
    const [detailed, setDetailed] = useState(false)
    const [updatinglikes, setUpdatinglikes] = useState(null)

    const toggleDetails = () => {
        setDetailed(!detailed)
    }

    const addLike = async () => {
        let newlikes = blog.likes + 1
        setUpdatinglikes('Päivitetään...')
        await blogservice.addLike(
            { ...blog, likes: newlikes },
            user
        )
        setUpdatinglikes(null)
        updateBlogs()
    }

    if (detailed) {
        return (
            <div key={blog.id} className='blogdetail'>
                <h3>

                    {blog.title} <br />
                    Kirjoittaja: {blog.author}
                </h3>
                <p>

                    {blog.url} <br />
                    likes: {updatinglikes ? updatinglikes : blog.likes}
                    <button onClick={addLike} className='likebutton'> like </button>
                    <br />
                    Lisännyt: {blog.user.name}
                </p>
                <button onClick={toggleDetails} className='hidedetail'> hide </button>
                <DeleteBtn
                    key={'buttonkey' + blog.id}
                    user={user}
                    blog={blog}
                    updateBlogs={updateBlogs}
                    updateMessage={updateMessage}
                ></DeleteBtn>
            </div>
        )
    }

    return (
        <div key={blog.id} className='blog'>
            <strong> Blogi: </strong> {blog.title}
            <strong> Kirjoittaja: </strong> {blog.author}
            <button onClick={toggleDetails} className='viewdetail'>view</button>
            <DeleteBtn
                key={'buttonkey' + blog.id}
                user={user}
                blog={blog}
                updateBlogs={updateBlogs}
                setDetailed={setDetailed}
                updateMessage={updateMessage}
            ></DeleteBtn>
        </div>
    )
}

export default Blog
