package jp.classmethod.scalatraswagger

case class Post(name: String, comment: String)

class PostRepository {

  private[this] var posts: IndexedSeq[Post] = IndexedSeq.empty

  def addPost(post: Post) {
    posts +:= post
  }

  def allPosts = posts

  def getPostsByName(name: String) = {
    posts filter { _.name == name }
  }
}