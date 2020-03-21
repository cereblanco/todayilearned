### Today I Learned: Docker

#### Basics

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

#### Docker tags

- Image **tag** is like a pointer to a specific layer in an image
- Tags are greatly used for versioning

*Tagging an image*
```bash
$ docker tag SOURCE_IMAGE[:tag] TARGET_IMAGE[:tag]
```

#### Building a Dockerfile
##### Tips:

- Sequence of commands is important as each command represents a layer in docker cache; **place on top of the Dockerfile the commands that change the least, and at the bottom of the file the commands that change the most**

- Combine related and multiple commands in one layer. We use the `&&` to combine or  chain one command after another. This saves time and space

#### Building docker image

```bash
$ docker build -t docker-tag-here .
# `-t`  followed by tag name
# `.` (dot) means build the Dockerfile in the current directory*

```


#### Cleaning up docker images

To save some space, here are some commands to cleanup unnecessary images 

```bash
$ docker image prune to clean up images
$ docker systen prune to clean up everything
$ docker image prune -a  to remove all images you are not using
$ docker image ls -a
```
