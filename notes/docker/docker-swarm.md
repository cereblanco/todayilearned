### Today I Learned: Docker Part 2: Swarm Mode


- [Swarm-mode](#swarm-mode)

## Swarm-mode
*Why Docker Swarm?*
  - automate container life cycle
  - scale up/down
  - ensure containers are recreated if they fail
  - replace containers without down time
 
A node has has 2 possible roles:
- Manager, has permissions to manage a swarm
- Worker, has *no* permission to manage a swarm

**NOTE**
- there can be multiple managers in a swarm

Useful tool to play around docker swarm
https://labs.play-with-docker.com/


**Command Line Interaface (Basics)**

_Starting a swarm; It will reply how you can another node to join our swarm_
```bash
$ docker swarm init --advertise-addr <this-node-ip-address>
```

_Joining a swarm; Copy paste from `swarm init` output_
```bash
$ docker swarm join --token <token> <leader/manager-ip-and-port> 
```

**TIP: CLI will guide you along the way and provide hints on available arguments/parameters you can use**

_Only manager can update node_
```bash
$ docker node update 
```

_Initial command, the CLI will guide you to perform whaterver task allowed_
```bash
$ docker service 
```
