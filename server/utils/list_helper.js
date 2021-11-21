const _ = require('lodash')


const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const total = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.sort((a, b) => b.likes - a.likes)[0]
    return favorite
}

const mostBlogs = (blogs) => {

    const countedauthors = _.countBy(blogs, (blog) => {
        return blog.author
    })

    const topauthorArray = (_.max(_.toPairs(countedauthors)))
    const topAuthor = {
        'author': topauthorArray[0],
        'blogs': topauthorArray[1]
    }

    return topAuthor

}

const mostLikes = (blogs) => {
    const groupedBloggers = _.groupBy(blogs, blog => blog.author)


    const bloggerArray = _.toPairs(groupedBloggers)
    const bloggersAndLikes = bloggerArray.map(blog => {
        return {
            'author': blog[0],
            'likes': blog[1].reduce((sum, blog) => sum + blog.likes, 0)
        }
    })

    const authorWithMostLikes = bloggersAndLikes.sort((a, b) => b.likes - a.likes)

    return authorWithMostLikes[0]

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}