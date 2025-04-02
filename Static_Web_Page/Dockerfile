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