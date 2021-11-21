const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

const Blog = require('../models/blog')


const getUserAuth = async() => {

    await User.deleteMany({})

    const saltRounds = 10
    const hash = await bcrypt.hash('adminpass', saltRounds)

    const newuser = new User({
        username: 'master',
        name: 'master',
        passwordHash: hash,
    })

    await newuser.save()

    const user = await api
        .post('/api/login')
        .send({ username: 'master', password: 'adminpass' })

    const autheader = 'Bearer ' + user.body.token

    return autheader

}


beforeEach(async() => {

    await Blog.insertMany(helper.initialBlogs)

})

afterEach(async() => {
    await Blog.deleteMany({})
})

describe('Testing for GET blogs', () => {

    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('id is named id', async() => {
        const response = await api.get('/api/blogs')
        const firstblog = response.body[0]
        expect(firstblog).toBeDefined()
    })


})
describe('Testing for POST and DELETE blogs', () => {


    const newBlog = {
        title: 'a new blog!',
        author: 'newBlogger',
        url: 'www.new.com'
    }



    test('missing token returns 401', async() => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

    })

    test('blogs can be added correctly', async() => {

        const auth = await getUserAuth()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: auth })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(4)
        expect(response.body[3].author).toBe(newBlog.author)
        expect(response.body[3].title).toBe(newBlog.title)
    })

    test('new blogs has 0 likes', async() => {
        const auth = await getUserAuth()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: auth })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body[3].likes).toBe(0)

    })

    test('blogs can be deleted by id correctly', async() => {

        const auth = await getUserAuth()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: auth })

        let res = await api.get('/api/blogs')
        let blogs = res.body
        const blogToDeleteUrl = '/api/blogs/' + blogs[3].id

        await api
            .delete(blogToDeleteUrl)
            .set({ Authorization: auth })
            .expect(204)

        res = await api.get('/api/blogs')
        blogs = res.body
        expect(blogs.length).toBe(3)

    })
})

describe('Testing for updating blogs', () => {
    test('blogs can be upated with PUT', async() => {
        let res = await api.get('/api/blogs')
        let blogs = res.body
        const blogToUpdateUrl = '/api/blogs/' + blogs[2].id

        res = await api
            .put(blogToUpdateUrl)
            .send({ 'likes': 7000 })

        expect(res.body.likes).toBe(7000)


    })
})

describe('testing for POST format', () => {
    test('invalid body should return 400 bad request', async() => {
        const newBlog = {
            'author': 'newBlogger',
            'url': 'www.new.com'
        }


        const auth = await getUserAuth()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ Authorization: auth })
            .expect(400)



    })
})

describe('tests for saving and retrieving users from DB', () => {
    beforeEach(async() => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('salsana123', 10)
        const user = new User({ username: 'root', name: 'vellu', passwordHash: passwordHash })

        await user.save()

    })

    test('one user in DB', async() => {
        const usersAtStart = await helper.usersInDb()
        expect(usersAtStart.length).toBe(1)

    })

    test('creating new user successfully', async() => {
        const newUser = {
            username: 'Peki',
            name: 'Pekka Perämies',
            password: 'salasana123',
            blogs: ['232232']
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const res = await api.get('/api/users')
        expect(res.body.length).toBe(2)
    })

    test('too short password responds 400 and error message and user is not added', async() => {
        const userWithShortPw = {
            username: 'Peki',
            name: 'Pekka Perämies',
            password: 'sa'
        }

        let res = await api
            .post('/api/users')
            .send(userWithShortPw)
            .expect(400)

        expect(res.body.error).toBeDefined()

        res = await api.get('/api/users')
            .expect(200)

        expect(res.body.length).toBe(1)


    })

})

describe('testing for token based login', () => {
    test('create one user in DB', async() => {

        await User.deleteMany({})

        const userAdmin = {
            username: 'admin',
            name: 'Pekka Perämies',
            password: 'adminsecretpass'
        }

        await api
            .post('/api/users')
            .send(userAdmin)
            .expect(200)
    })

    test('login with username and password', async() => {
        const credentials = {
            username: 'admin',
            password: 'adminsecretpass'
        }

        const res = await api
            .post('/api/login')
            .send(credentials)
            .expect(200)

        expect(res.body.token).toBeDefined()
    })

})



afterAll(() => {
    mongoose.connection.close()
})