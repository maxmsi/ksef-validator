# build mvn image
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# build jar
RUN mvn clean package -DskipTests

# Etap 2: Uruchamianie (lekki obraz Java)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Kopiujemy zbudowany plik .jar z etapu 1
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
