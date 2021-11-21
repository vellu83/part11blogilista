const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')


blogsRouter.get('/', async(request, response) => {
    let blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.get('/:id', async(request, response) => {

    let res = await Blog.findById(request.params.id)
    logger.info(res)
    if (!res) {
        response.status(404).end()
    } else {
        response.json(res.toJSON())
    }
})

blogsRouter.post('/', async(request, response) => {

    const body = request.body

    const user = await User.findById(request.user)
    if (!user) {
        return response.status(401).json({ error: 'user not found' })
    }

    if (!body.likes) {
        body.likes = 0
    }


    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: request.user
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.json(savedBlog.toJSON())

})

blogsRouter.delete('/:id', async(request, response) => {

    const blog = await Blog.findById(request.params.id)
    const blogUserId = blog.user.toString()

    if (blogUserId === request.user) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'invalid user' })
    }



})

blogsRouter.put('/:id', async(request, response) => {

    const blog = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())

})

module.exports = blogsRouter