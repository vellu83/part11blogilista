import axios from 'axios'
const baseUrl = '/api/blogs'

let updateUrl = null
let blogtosave = null
let config = null

// actual async funtions that does the rest operations. no parameters on async funtion so the data is forwarder with helper variables

const getAll = async() => {
    const response = await axios.get(baseUrl)
    const sorted = response.data.sort((a, b) => b.likes - a.likes)
    return sorted
}

const saveBlog = async() => {
    const res = await axios.post(baseUrl, (blogtosave), config)
    return res.data
}

const updateBlog = async() => {
    const res = await axios.put(updateUrl, (blogtosave), config)
    return res.data
}

const deleteBlog = async() => {
    const res = await axios.delete(updateUrl, config)
    return res.data

}


// funtions to export with user and blog parameters:


const createNew = (user, blog) => {
    config = {
        headers: { Authorization: `Bearer ${user.token}` }
    }
    blogtosave = { ...blog, likes: 0 }
    return saveBlog()
}

const addLike = (blog) => {
    updateUrl = baseUrl + '/' + blog.id

    blogtosave = { ...blog, user: blog.user.id }
    return updateBlog()
}

const removeBlog = (user, blog) => {
    updateUrl = baseUrl + '/' + blog.id

    config = {
        headers: { Authorization: `Bearer ${user.token}` }
    }

    return deleteBlog()

}

export default { getAll, createNew, addLike, removeBlog }