const config = require('../../../server/utils/config')

beforeEach(function() {
    cy.request('POST', `http://localhost:${config.PORT}/api/testing/reset`)
    cy.visit(`http://localhost:${config.PORT}`)
})

describe('Blog app', function() {


    it('Login form is shown', function() {
        cy.contains('LOGIN')
    })

})

describe('Login', function() {
    beforeEach(function() {

        const user = {
            name: 'Vellu Remander',
            username: 'vellu',
            password: 'salasana'
        }
        cy.request('POST', `http://localhost:${config.PORT}/api/users/`, user)
    })

    it('succeeds with correct credentials', function() {
        cy.get('#username').type('vellu')
        cy.get('#password').type('salasana')
        cy.get('#submitlogin').click()
        cy.contains('Vellu Remander logged in')
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type('vellu')
        cy.get('#password').type('väärä')
        cy.get('#submitlogin').click()
        cy.contains('invalid credentials')
    })

})

describe('When logged in', function() {
    beforeEach(function() {
        const user = {
            name: 'Vellu Remander',
            username: 'vellu',
            password: 'salasana'
        }
        cy.request('POST', `http://localhost:${config.PORT}/api/users/`, user)
        cy.login(user.username, user.password)

    })

    it('A blog can be created', function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('uusi blogi')
        cy.get('#author').type('blogin kirjottaja')
        cy.get('#url').type('www.fi')
        cy.get('#submitblog').click()
        cy.contains('Blogi:')
        cy.contains('uusi blogi')
    })

    it('a blog can be liked', function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('uusi blogi')
        cy.get('#author').type('blogin kirjottaja')
        cy.get('#url').type('www.fi')
        cy.get('#submitblog').click()

        cy.get('.viewdetail').click()
        cy.get('.likebutton').click()

        cy.contains('likes: 1')


    })

    it('can be deleted by logged user', function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('uusi blogi')
        cy.get('#author').type('blogin kirjottaja')
        cy.get('#url').type('www.fi')
        cy.get('#submitblog').click()
        cy.get('.delete').click()
        cy.contains('blog deleted!')

    })

    it('blogs in correct order', function() {
        cy.add3Blogs()
        cy.visit(`http://localhost:${config.PORT}`)
        cy.get('.viewdetail').click({ multiple: true })
        cy.get('.blogdetail').its(0).contains('uusi blogi2')
        cy.get('.blogdetail').its(1).contains('uusi blogi3')
        cy.get('.blogdetail').its(2).contains('uusi blogi1')


    })
})