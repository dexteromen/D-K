> docker build -t web-page:v1 .  
> docker run -d -p 8081:80 web-page:v1
> docker stop 54b5734f967a15c3d0914b0789d138c562a7de25aa76595f8d57fd91d60bd20b
> docker run -v $(pwd):/usr/share/nginx/html -d -p 8081:80 web-page:v1 