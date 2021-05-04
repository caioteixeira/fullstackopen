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

module.exports = { 
  dummy, totalLikes
}