const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title':'potato',
    'author':'Caio',
    'url':'https://www.pudim.com.br',
    'likes':10
  },
  {
    'title':'Batata',
    'author':'Caio',
    'url':'https://www.pudim.com.br',
    'likes':0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'to be deleted',
    author: 'anonymous',
    url: 'https://pudim.com.br',
    likes: 10
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}