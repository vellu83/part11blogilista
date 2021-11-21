const User = require('../models/user')

const initialBlogs = [{
    'title': 'Testinblog1',
    'author': 'TestingBlogger',
    'url': 'www.com',
    'likes': 50
},
{
    'title': 'Testinblog2',
    'author': 'TestingBlogger2',
    'url': 'www.com',
    'likes': 80
},
{
    'title': 'Testinblog3',
    'author': 'TestingBlogger3',
    'url': 'www.com',
    'likes': 70
}
]

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    usersInDb
}