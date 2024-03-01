# Stage 1: Build the Angular app
FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install Axios
RUN npm install axios

COPY . .
RUN npm run build --prod

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Copy the static files from the builder stage to the Nginx server
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]
