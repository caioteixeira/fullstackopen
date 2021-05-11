const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved' , () => {
  test('blogs are return as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('a specific title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('potato')
  })
})

describe('addition of new blogs' , () => {
  test('a valid blog can be added', async () => {
    const newBlog = 
      {
        'title':'A new note',
        'author':'Mark Zuckerberg',
        'url':'https://www.facebook.com.br',
        'likes':10
      }
    
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('A new note')
  })
  
  test('a valid blog can be added with no likes by default', async () => {
    const newBlog = 
      {
        'title':'A new note',
        'author':'Mark Zuckerberg',
        'url':'https://www.facebook.com.br'
      }
    
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(0)
  })
  
  test('blog without content is not added', async () => {
    const newBlog = {
      'author':'Mark Zuckerberg'
    }
  
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('update existing blogs', () => {
  test('delete a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('update a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 242

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const likes = blogsAtEnd.map(blog => blog.likes)
    expect(likes).toContain(blogToUpdate.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
