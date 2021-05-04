const dummy = () => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const likes = blogs.map(blog => blog.likes)

  if(likes.length == 0) {
    return 0
  }

  return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  if(blogs.length == 0) {
    return
  }

  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes).reverse()
  return sortedBlogs[0]

}

module.exports = { 
  dummy, totalLikes, favoriteBlog
}