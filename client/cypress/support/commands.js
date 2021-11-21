// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// rummaa copy-pastea mutta oikasin hieman...

const config = require('../../../server/utils/config')


Cypress.Commands.add('login', (username, password) => {

    cy.request('POST', `http://localhost:${config.PORT}/api/login`, { username, password })
        .then(({ body }) => {
            localStorage.setItem('userdata', JSON.stringify(body))
            cy.visit(`http://localhost:${config.PORT}`)
        })

})

Cypress.Commands.add('add3Blogs', () => {
    const user = JSON.parse(localStorage.getItem('userdata'))

    const header = { Authorization: `Bearer ${user.token}` }
    const url = `http://localhost:${config.PORT}/api/blogs/`

    const blog = {
        title: 'uusi blogi1',
        author: 'testibloggaaja',
        url: 'www.fi',
        likes: 1
    }


    const options = {
        method: 'POST',
        url: url,
        body: blog,
        headers: header,
    }
    const blog2 = {
        title: 'uusi blogi2',
        author: 'testibloggaaja',
        url: 'www.fi',
        likes: 6
    }


    const options2 = {
        method: 'POST',
        url: url,
        body: blog2,
        headers: header,
    }
    const blog3 = {
        title: 'uusi blogi3',
        author: 'testibloggaaja',
        url: 'www.fi',
        likes: 2
    }


    const options3 = {
        method: 'POST',
        url: url,
        body: blog3,
        headers: header,
    }

    cy.request(options)
    cy.request(options2)
    cy.request(options3)


})