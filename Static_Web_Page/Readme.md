```
https://wordspiner.xyz/a-step-by-step-guide-to-dockerizing-software-applications/
```
In the ever-evolving landscape of software development, the adoption of containerization has become a game-changer, empowering developers to streamline deployment processes and enhance scalability. One of the leading technologies in this realm is Docker, a platform that allows you to package applications and their dependencies into portable containers. In this blog, we’ll journey to demystify the art of Dockerizing Software Applications. The principles remain the same whether you’re dealing with web servers, databases, or custom services.

common Docker commands
```
docker run image >> downloads the image from online if not present on the local repository
docker ps >> lists all running containers
docker ps -a >> lists all containers both running or stopped
docker stop container-name >> stop running container
docker rm container-name >> remove container permanently
docker images >> lists all images
docker rmi image-name >> removes image ; first stop image to remove it
docker pull image-name >> pulls the image to local repository
docker inspect container-name >> gives more infor:: among them env definitions
```
Containerizing a Static Website(HTML, CSS, and javascript)
On the root folder of your project, create a file named Dockerfile and add the code below, then run the command that follows after the code:
```dockerfile
# Use a lightweight base image
FROM nginx:alpine

# Set the working directory to the web root
WORKDIR /usr/share/nginx/html

# Copy all files and folders from the code directory to the container
COPY . .

# Expose the default Nginx port
EXPOSE 80

# Command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
```

```
docker build -t dockerusername/webapp-name .
```
if you intend to push your image to dockerhub, you have to add your dockerusername, otherwise ignore it. 

This Dockerfile utilizes the official Nginx image from the Alpine Linux distribution, a lightweight base for serving static content. It sets the working directory to the default web root of Nginx, copies the HTML file (index.html) and the CSS file (styles.css) into the container, exposes the default Nginx port 80, and starts Nginx in the foreground. This simple configuration allows you to dockerize a basic HTML and CSS website for quick and efficient deployment.

Now run the following command to run your container:
```
docker-compose up -d   #to run the container in detach mode.
```