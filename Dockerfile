# ===== Dockerfile for Weather App =====
# This file tells Docker how to build our app

# Step 1: Use Nginx as the base image (a web server)
# Think of this as: "Start with a ready-made web server"
FROM nginx:alpine

# Step 2: Copy our app files into Nginx's web folder
# Nginx serves files from /usr/share/nginx/html
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY config.js /usr/share/nginx/html/

# Step 3: Expose port 80 (default web port)
# This tells Docker: "The app runs on port 80"
EXPOSE 80

# Step 4: Nginx starts automatically, no extra command needed
# The container will serve our Weather App on port 80
