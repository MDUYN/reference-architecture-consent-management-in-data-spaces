#!/bin/bash

git clone https://github.com/zalando/postgres-operator.git

cd postgres-operator

kubectl create -f manifests/configmap.yaml  # configuration
kubectl create -f manifests/operator-service-account-rbac.yaml  # identity and permissions
kubectl create -f manifests/postgres-operator.yaml  # deployment
kubectl create -f manifests/api-service.yaml  # operator API to be used by UI

# cd ../manifests

# kubectl apply -f  *

# sleep 20

# kubectl port-forward svc/postgres-operator-ui 8081:80

