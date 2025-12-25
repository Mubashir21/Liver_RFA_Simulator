FROM node:20-alpine

WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./

RUN npm install

# copy project files
COPY . .

EXPOSE 5173

# Important: Vite must listen on 0.0.0.0 in Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]