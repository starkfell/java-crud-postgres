# java-crud-postgres

Java CRUD Postgres

## chicken nuggets to refer to later

- <https://medium.com/@bhargavkanjarla01/how-to-combine-a-java-spring-boot-back-end-with-a-reactjs-front-end-app-ed8d8ca65285>
- <https://github.com/MSpilari/fullstack-app-deploy-render>
- <https://github.com/Moataz-Mahmoud/CRUD-operations-with-Spring-Boot-Dockerized->
- <https://github.com/Clifftech123/spring-crud-docker>
- <https://github.com/PrabhaWijera/Spring-Boot-CRUD-Project-With-MySQL-Database-in-Docker>
- <https://dev.to/bansikah/building-a-user-crud-application-with-spring-boot-and-docker-521n>
- <https://start.spring.io/>
. . .

Because I can never remember the path in VS Code where to set JAVA - C:\Users\{USERNAME}\AppData\Roaming\Code\User\settings.json

```powershell
choco install maven
```

Maven Path:
Maven home: C:\ProgramData\chocolatey\lib\maven\apache-maven-3.9.11

To quickly refresh environment variables in PowerShell session in VS Code:

```powershell
Import-Module $env:ChocolateyInstall\helpers\chocolateyProfile.psm1
refreshenv
```

```powershell
mvn -v
```

```powershell
# skip tests.
mvn -DskipTests package

# build package and do tests.
mvn clean package
```

chicken

.

Frontend

```powershell
cd ./frontend
docker build -t frontend .
docker network create app-network
docker run -d -p 3000:80 --name frontend --network app-network frontend

```

Backend

```powershell
docker run -d --name postgres-local-db `
--network app-network `
-e POSTGRES_PASSWORD=password `
-e POSTGRES_DB=appdb `
-p 5432:5432 `
postgres

docker build -t backend .

docker run -d --name backend `
--network app-network `
-e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-local-db:5432/appdb `
-p 8080:8080 `
backend

```

.

Rebuilding Frontend for Development purposes.

```powershell
docker rm -f frontend 
docker build -t frontend .
docker run -d -p 3000:80 --name frontend --network app-network frontend

```
