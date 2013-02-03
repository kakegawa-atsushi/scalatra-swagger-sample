import jp.classmethod.scalatraswagger._
import org.scalatra._
import javax.servlet.ServletContext

/**
 * This is the Scalatra bootstrap file. You can use it to mount servlets or
 * filters. It's also a good place to put initialization code which needs to
 * run at application start (e.g. database configurations), and init params.
 */
class Scalatra extends LifeCycle {
  override def init(context: ServletContext) {
    // REST APIを叩くサンプルクライアントページを返すコントローラをマウント
    context.mount(new RootController, "/*")
    // REST APIのルーティングを行うコントローラをマウント
    context.mount(new SwaggerTestController, "/posts/*")
  }
}
