package jp.classmethod.scalatraswagger

import org.scalatra.swagger.{JacksonSwaggerBase, Swagger, SwaggerBase}
import org.scalatra.ScalatraServlet
import com.wordnik.swagger.core.SwaggerSpec

class ResourcesApp(implicit val swagger: Swagger) extends ScalatraServlet with JacksonSwaggerBase

class SwaggerTestSwagger extends Swagger(SwaggerSpec.version, "1.0")