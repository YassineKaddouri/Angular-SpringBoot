FROM maven:3.6.1-jdk-11-slim AS build
WORKDIR /IURC
COPY pom.xml /IURC
COPY src /IURC/src
# RUN mvn -f pom.xml clean package
CMD mvn  -f pom.xml spring-boot:run

EXPOSE 8080


# FROM openjdk:11-jdk
# COPY --from=build /crossdock-api/target/*.jar app.jar

# # CMD ["java","-jar","app.jar"]
# #  mvn clean install

# FROM maven
# COPY pom.xml /crossdock-api
# CMD mvn  -f pom.xml spring-boot:run