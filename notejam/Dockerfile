FROM node:16
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
COPY start.sh .
EXPOSE 4000
ENV NODE_ENV=production
CMD ["./start.sh"]

