+++ 
date = "2021-08-22"
title = "Adding docker-compose to Existing Project"
description = "Example of adding docker-compose to an existing api project"
tags = ["docker", "docker-compose", "dev-ops"]
type = "posts"
+++

## Background

[Docker-compose](https://docs.docker.com/compose/) is an amazing CLI tool for managing multi-container applications. This post gives an overview on how an API project incorporates `docker-compose` (including makefile commands for ease of use).

## The App

The app is an implementation of the [freeCodeCamp's timeserver API project](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice). I used [Golang](https://golang.org/) with the [Gin](https://github.com/gin-gonic/gin) web framework to create the REST API. You can view the code for the project [here](https://github.com/ammiranda/timeserver).

## Setting Up Docker-compose

The application already has a Dockerfile so all that is needed is a `docker-compose` yaml file. The default filename for the file is `docker-compose.yml` so we can create it in the root of the timeserver repository.

_docker-compose.yml_

```yaml
version: '3.8'
services:
  web:
    build:
      context: ./
      dockerfile: ./Dockerfile
    ports:
      - '8080:80'
    environment:
      - PORT=80
```

The version field is specifying the `docker-compose` version to use when parsing the yaml file. 3.8 is the latest `docker-compose` version at the time of this writing.

The services' section is what is used to specify all of the containers needed for the application. For this example the API is just one container which is defined by the Dockerfile in the repository whose path is defined in the yaml file in the `dockerfile` field (shown at `./Dockerfile`). The ports section specifies what ports to expose both within the container and what external ports are exposed outside the container. The environment section allows for the setting of environmental variables that will be set within the container. For this example, I just needed to set the `PORT` environmental variable because that is what [Gin uses](https://github.com/gin-gonic/gin/blob/4e7584175d7f2b4245249e769110fd1df0d779db/utils.go#L142) to determine what port it will listen to when running the server. I set the value to 80 because the ports section specifies the internal port exposed is also 80 and will expose to port 8080 outside the container.

## Adding `docker-compose` Commands to Makefile

The real power from `docker-compose` is when you can compose the complicated commands into simpler Makefile alias commands. The commands I created for timeserver's Makefile are below:

```makefile
dev-up:
	docker-compose -f ./docker-compose.yml up -d

dev-down:
	docker-compose -f ./docker-compose.yml down

dev-clean: dev-down
	docker-compose -f ./docker-compose.yml rm -f
```

`dev-up` will bring the application up in a docker container with the application live at your local machine's 8080 port.

`dev-down` will stop the application's container(s).

`dev-clean` will stop the applications container(s) and will delete the stopped containers.

## References

- [timeserver](https://github.com/ammiranda/timeserver)
- [docker-compose](https://docs.docker.com/compose/)
