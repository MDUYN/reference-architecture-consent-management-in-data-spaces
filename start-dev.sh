#!/bin/bash

# Setup minikube

# Delete old minikube
minikube stop 
minikube delete

# Create a new minikube
minikube start --driver=virtualbox --cpus=4 --memory=8192

# Enable ingress on new minikube
minikube addons enable ingress

# Skaffold

# Remove old skaffold
rm skaffold.yaml

# Start new skaffold
skaffold init

# Open a new terminal with skaffold running
gnome-terminal -- bash -c 'skaffold dev'

# Manage the hosts
sh ./manage-hosts.sh

# Open the frontend service
minikube service frontend-service 


