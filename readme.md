# Devops Project Rayane Bouaita and Guillaume Prevost SI02

## Authors 
* Rayane Bouaita
* Guillaume Prevost
* SI02
* 2023-2024

## Installation

This application is written on NodeJS and it uses Redis database.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Install application 
4. [Install Docker](https://docs.docker.com/get-docker/)
5. [Install Vagrant](https://www.vagrantup.com/downloads)
6. [Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
7. [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)

Go to the userapi directory of the application and run:
```
npm install 
```

To start Redis perform the following command:
```bash
redis-server
```

# Tasks performed

## 1. Create a web application 

We created a web application using NodeJS and ExpressJS. The application is a simple API that allows to create, read, update and delete users. 
The application is configured to run on port 3000. The application is using Redis database to store the users. 

You can add a user using the following command:
```bash
curl -H "Content-Type: application/json" -X POST -d '{"username":"sergkudinov","firstname":"Sergei","lastname":"Kudinov"}' http://localhost:3000/user
curl -H "Content-Type: application/json" -X POST -d '{"username":"roibouta","firstname":"Rayane","lastname":"Bouaita"}' http://localhost:3000/user
```

In the application we covered the following tests:
- 2 for the configuration of the application
- 1 for redis 
- 10 for the user CRUD operations
- 8 for the user REST API

Using the following command you can run the tests:
```bash
npm test
```
Then you will see the following output:


![tests](./images/test.png)

Then to ensure healtcheck of the application we created a healthcheck endpoint that returns the status of the application. 
Also using the endpoint /user/[username] we can get the user information.

![healthcheck](./images/2.png)
![user](./images/3.png)

## 2. Apply CI/CD pipeline

We created a CI/CD pipeline using Github Actions. The pipeline is triggered when a push is made to the master branch.



First, we created the CI pipeline that runs the tests of the application. We use the Github Actions to run the tests.

Then, we used Azure Web Service to deploy the application. We add a job named deploy that runs when the CI pipeline is successful. This job will deploy the application on Azure Web Service.
You can access to the worlflow file [here](./.github/workflows/CICD.yml).

On the repository page, and in the actions tab, we can see the CI/CD pipeline running and the status of the pipeline:
![CI/CD](./images/4.png)

On the azure portal, we can see the application deployed on Azure Web Service:
![azure](./images/5.png)

Then, we can access to the application using the following link: https://devops-project-bouaita-prevost-si02.azurewebsites.net/

## 3. Infrastructure as code using Vagrant and Ansible

First, we created a [Vagrantfile](./iac/Vagrantfile) that contains the configuration of the virtual machine. 
The VM is running on Ubuntu 20.04. 

Then, in the file we used the following line to use synchronization of the files between the host and the guest machine:
```bash
 config.vm.synced_folder "../", "/home/vagrant/app"
```
We provisioned the VM using Ansible. We created a [playbook](./iac/playbooks/roles/vm/install) that installs NodeJS, Redis and the application.
An another [playbook](./iac/playbooks/roles/vm/healthchecks/tasks/main.yml) to ensure the healthcheck of the application.

We use the following command to bring up the VM:
```bash
vagrant up
```
Then, to go inside the VM we use the following command:
```bash
vagrant ssh
```

We can see that redis and nodejs are installed on the VM:
![redis](./images/redis.png)
![nodejs](./images/node.png)

We can see also the application folder that is synchronized between the host and the guest machine:
![app](./images/app.png.jpg)

Finally, once the vrangant up or vagrant provision is done, we have the healthcheck of the application:
![healthcheck](./images/pass.png)

## 4. Build a Docker image 

We creat a [Dockerfile](./userapi/Dockerfile) that contains the configuration of the Docker image.
We use the following command to build the image:
```bash
docker build -t devops_project_bouaita_prevost .
```
![dockerimage](./images/dockerimage.png)

Then, we push the image to the Docker Hub:
```bash
docker push rayanebouaita/devops_project_bouaita_prevost
```
![dockerhub](./images/dockerhub.png)

In the docker hub we have: 
![dockerhub](./images/dockerhub2.png)

## 5. Docker Compose

We created a [docker-compose.yml](docker-compose.yml) file that contains the configuration of the application and the redis database.
We use the following command to run the application:
```bash
docker-compose up
```
![dockercompose](./images/compose.png)

Then, we can access to the application using the following link: http://localhost:3000/ 

![dockercompose](./images/local.png)

We can also, check that the application is currently running by entering the following command:
```bash
docker exec -it userapi-web-1 "bash"
```
![dockercompose](./images/exec.png)

## 6. Kubernetes

First of all, we used minikube to create a local Kubernetes cluster. We used the following command to start minikube:
```bash
minikube start
```
Then we create several files on the kubernetes directory. Two files for the deployment of the application and the redis database. Two files for the services of the application and the redis database. And finally, one file for the PV and an another for the PVC.
All the files are available [here](./k8s).

Then, we used the following command to deploy the application:
```bash
kubectl apply -f pv.yaml
kubectl apply -f pvc.yaml
kubectl apply -f redis-deploy.yaml
kubectl apply -f redis-service.yaml
kubectl apply -f web-deploy.yaml
kubectl apply -f web-service.yaml
```

We can see that the application is running on the Kubernetes cluster. We can see the pods, the services and the persistent volume. We used minikube service web to access to the application.
The web application is accessible at http://127.0.0.1.56808.
![kubernetes](./images/k8s.png)

## 7. Mesh using Istio



## 8. Monitoring using Prometheus and Grafana

