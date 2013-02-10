package jp.classmethod.scalatraswagger

import org.scalatra._
import org.scalatra.json._
import org.scalatra.swagger._
import org.json4s._

class SwaggerTestController(implicit val swagger: Swagger) extends ScalatraServlet with JacksonJsonSupport with SwaggerSupport {

  override protected implicit val jsonFormats = DefaultFormats
  private[this] val postRepo = new PostRepository

  // Swagger specに出力するAPIの名前
  override protected val applicationName = Some("posts")
  // Swagger specに出力するAPIの概要
  protected val applicationDescription = "コメントの投稿と、投稿されたコメントの取得機能を提供するAPIです。"

  before() {
    contentType = formats("json")
  }

  get("/", operation(
    apiOperation[List[Post]]("getPosts")
    summary "全ての投稿を取得"
    notes "全ての投稿を取得します。名前による絞り込みもできます。"
    parameter queryParam[String]("name").description("取得する投稿の名前").optional
    )) {
    params.getAs[String]("name") match {
      case Some(name) => postRepo getPostsByName name
      case None => postRepo.allPosts 
    }
  }

  post("/", operation(
    apiOperation[Unit]("addPost")
    summary "コメントを投稿"
    notes """|コメントを投稿します。必ず名前(name)とコメント(comment)をJSON形式のパラメータとして渡す必要があります。
         |<br>どちらかが渡されなかった場合、400を返します。""".stripMargin
    parameter bodyParam[Post]("post").description("投稿データ").required
    error Error(400, "パラメータが不正")
    )) {
    parsedBody.extractOpt[Post] match {
      case Some(post) => 
        postRepo addPost post
        Ok()
      case _ => halt(400, "invalid params")
    }
  }

  notFound {
    halt(404)
  }
}
