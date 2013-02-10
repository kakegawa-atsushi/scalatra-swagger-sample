organization := "jp.classmethod"

name := "scalatra-swagger-sample"

version := "0.1.0-SNAPSHOT"

scalaVersion := "2.9.2"

seq(webSettings :_*)

classpathTypes ~= (_ + "orbit")

resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

libraryDependencies ++= Seq(
  "org.scalatra" % "scalatra" % "2.2.0",
  "org.scalatra" % "scalatra-scalate" % "2.2.0",
  "org.scalatra" % "scalatra-specs2" % "2.2.0" % "test",
  "org.scalatra" % "scalatra-json" % "2.2.0",
  "org.scalatra" % "scalatra-swagger"  % "2.2.0",
  "org.json4s" %% "json4s-jackson" % "3.1.0",
  "com.wordnik" % "swagger-core_2.9.1" % "1.2.0",
  "ch.qos.logback" % "logback-classic" % "1.0.6" % "runtime",
  "org.eclipse.jetty" % "jetty-webapp" % "8.1.7.v20120910" % "container;test",
  "org.eclipse.jetty.orbit" % "javax.servlet" % "3.0.0.v201112011016" % "container;provided;test" artifacts (Artifact("javax.servlet", "jar", "jar"))
)
