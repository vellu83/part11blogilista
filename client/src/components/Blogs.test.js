import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogservice from '../services/blogservice'
import AddBlog from './addBlog'


// blogiaplikaation rakenteesta jouduin suorittamaan testit hieman monimutkaisemmin kun mitä tässä tehtävässä oli tarkoitettu
// esimerkiksi Blog componetissa nappulan klikkauksen tapahtumankäsittelijää ei määritelty propsina vaan se oli komponentin sisällä.
// tämän takia käytin mockattua blockservice moduulia testissä tarkkailemaan nappulan painamista.


describe('Testing for blog entries', () => {

    const tempblog = {
        title: 'uusi blogi',
        author: 'blogin kirjoittaja',
        url: 'www.blogi.com',
        likes: 500,
        user: {
            id: 'aabb55',
            name: 'Testi Käyttäjä',
            username: 'Testi'
        }
    }


    test('inititally renders title and author', () => {

        const updateBlogs = () => {
            return null
        }

        const component = render(
            // eslint-disable-next-line react/no-string-refs
            <Blog blog={tempblog} updateBlogs={updateBlogs}></Blog>
        )

        expect(component.container).toHaveTextContent('uusi blogi')
        expect(component.container).toHaveTextContent('blogin kirjoittaja')
        expect(component.container).not.toHaveTextContent('www.blogi.com')
        expect(component.container).not.toHaveTextContent('likes')

    })

    test('after view button url and likes are visible', () => {

        const updateBlogs = () => {
            return null

        }
        const component = render(
            // eslint-disable-next-line react/no-string-refs
            <Blog blog={tempblog} updateBlogs={updateBlogs}></Blog>
        )

        const viewbutton = component.getByText('view')

        fireEvent.click(viewbutton)

        expect(component.container).toHaveTextContent('www.blogi.com')
        expect(component.container).toHaveTextContent('likes')

    })

    test('clicking like button twice calls event hanlder twice', async () => {
        const updateBlogs = () => {
            return null

        }

        const likeSpy = jest.spyOn(blogservice, 'addLike').mockImplementation(() => {
            return {
                title: 'uusi blogi',
                author: 'blogin kirjoittaja',
                url: 'www.blogi.com',
                likes: 300,
                user: 'abc123'
            }
        })

        const component = render(
            // eslint-disable-next-line react/no-string-refs
            <Blog blog={tempblog} updateBlogs={updateBlogs}></Blog>
        )


        const viewbutton = component.getByText('view')
        fireEvent.click(viewbutton)


        const likebutton = component.getByText('like')
        fireEvent.click(likebutton)
        fireEvent.click(likebutton)

        await waitFor(() => {
            expect(likeSpy).toHaveBeenCalledTimes(2)
        })

    })

    test('adding blog callback with proper data', async () => {

        const updateMessage = () => {
            return null
        }

        const component = render(
            // eslint-disable-next-line react/no-string-refs
            <AddBlog user={{ username: 'keke' }} updateMessage={updateMessage}/>
        )

        const form = component.container.querySelector('#addblogform')
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')

        userEvent.type(title, 'keijon blogi')
        userEvent.type(author, 'keijo')
        userEvent.type(url, 'www.com')


        const addSpy = jest.spyOn(blogservice, 'createNew').mockImplementation((user, blogdetails) => {
            return {
                user: user,
                blogdetails: blogdetails,
            }
        })

        fireEvent.submit(form)


        expect(addSpy).toHaveBeenCalled()

        await waitFor(() => {
            expect(addSpy).toHaveReturnedWith({
                user: { username: 'keke' },
                blogdetails: {
                    title: 'keijon blogi',
                    author: 'keijo',
                    url: 'www.com'
                }
            })
        })

    })
})