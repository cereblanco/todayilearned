### Today I Learned: Docker

1. [Images](#docker-images)
2. [Containers](#docker-containers)

## Docker Images

*Show all images*
```bash
$ docker image ls
```

*Show the layers of an image*
```bash
$ docker history REPOSITORY[:tag]
```

Notes:
- An image consists of a stack of layers
- `Layers` can be compared to `commits` in git
- Your machine downloads these `layers` in docker cache
- Only one copy of commit hash is downloaded and stored in docker cache. This saves up space in your machine

*Show details of an image*
```bash
$ docker inspect REPOSITORY[:tag]
```

## Docker tags

- Image **tag** is like a pointer to a specific layer in an image
- Tags are greatly used for versioning

*Tagging an image*
```bash
$ docker tag SOURCE_IMAGE[:tag] TARGET_IMAGE[:tag]
```

## Building a Dockerfile
### Tips:

- Sequence of commands is important as each command represents a layer in docker cache; **place on top of the Dockerfile the commands that change the least, and at the bottom of the file the commands that change the most**

- Combine related and multiple commands in one layer. We use the `&&` to combine or  chain one command after another. This saves time and space

## Building docker image

```bash
$ docker build -t docker-tag-here .
# `-t`  followed by tag name
# `.` (dot) means build the Dockerfile in the current directory*
```


## Cleaning up docker images

To save some space, here are some commands to cleanup unnecessary images 

```bash
$ docker image prune to clean up images
$ docker systen prune to clean up everything
$ docker image prune -a  to remove all images you are not using
$ docker image ls -a
```

## Docker Containers


- `Containers` are immutable and ephemeral
- they dont change; thus if change is needed, dispose the current and just deploy a new one
- how about persistent data? We use `Volumes` and `Bind Mounts`

#### Volumes
- volumes can outlive a container, this is good for persistent data such as `databases`

*Show all volumes*
```bash
$ docker volume ls
```

*Example from mysql image*
```yml
VOLUME /var/lib/mysql
```

#### Bind Mounting

- File sharing between a host and a Docker container
- Can't use in docker, but must at container run

Running a container with your host directory synced with container directory
```bash
$ ... -v /host/path:/container/path
```

#### Other commands

*List the running containers*
```bash
$ docker container ls
```

* Run a container from an image; name the running container with `--name`;
expose port 80 of the container to port 5000 on host*

```bash
$ docker container run --name c-p 5000:80 <image>
```

*Stop container through SIGTERM*
```bash
$ docker container stop  <name>
```

*Stop container through SIGKILL*
```bash
$ docker container kill <name>
```

*Show the logs of the container*
```bash
$ docker logs -f <container-id> -t
```

*Go inside the container*
```bash
$ docker exec -it <container-id> bash
```
