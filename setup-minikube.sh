#!/bin/bash

# Setup minikube

# Delete old minikube
minikube stop 
minikube delete

# Create a new minikube
minikube start --driver=virtualbox --cpus=4 --memory=8192

# Enable ingress on new minikube
minikube addons enable ingress
