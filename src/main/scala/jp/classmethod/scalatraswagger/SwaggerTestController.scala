package jp.classmethod.scalatraswagger

import org.scalatra._
import org.scalatra.json._
import org.json4s._

class SwaggerTestController extends ScalatraServlet with JacksonJsonSupport {

  protected implicit val jsonFormats: Formats = DefaultFormats
  private[this] val postRepo = new PostRepository

  before() {
    contentType = formats("json")
  }

  get("/") {
    Extraction.decompose(postRepo.allPosts)
  }

  get("/:name") {
    val posts = params.get("name") match {
      case Some(name) => postRepo getPostsByName name
      case None => List.empty
    }
    Extraction.decompose(posts)
  }

  post("/") {
    val receivedPost = for {
      name <- params.get("name")
      comment <- params.get("comment")
    } yield Post(name, comment)

    receivedPost match {
      case Some(post) => 
        postRepo addPost post
        Extraction.decompose(post)
      case None => halt(400)
    }
  }

  notFound {
    halt(404)
  }
}
