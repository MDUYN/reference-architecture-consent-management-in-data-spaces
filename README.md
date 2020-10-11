# Reference Architecture Consent Management in Data Spaces

**TNO uses these applications to show how consent management can be applied in a data space**. 
This application works on any Kubernetes cluster (such as a local one), as well as Cloud based
Kubernetes Engines. 


## Service Architecture

**The reference architecture** is composed of many components (micro-services) written in different
languages that talk to each other over REST.


| Service | language| Description  |
| ---------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [consent-manager](./services_infrastructure/consent-manager) | python | REST Api that functions as a consent manager. |
| [data-provider](./services_infrastructure/data-provider) | python | REST Api that functions as a data provider. |
| [frontend](./services_infrastructure/frontend) | javascript | Exposes an HTTP server to serve the website. |


## Features

- **[Kubernetes](https://kubernetes.io):**
   The infrastructure is designed to run on Kubernetes (both locally on "Docker for
   Desktop", as well as on the cloud).
- **[Flask](https://flask.palletsprojects.com/):** Public microservices make use of flask to provide a REST interface.
- **[Skaffold](https://skaffold.dev):** Applications are deployed to Kubernetes with a single command using Skaffold.


## Installation

Installation of the infrastructure kan be done locally and in the cloud. 

The following installation methods are supported:

### Running locally (~20 minutes) 
   You will build and deploy the microservices images to a single-node Kubernetes cluster running
   on your development machine. You need install the following requirements:

#### Prerequisites
   - [Docker](https://www.docker.com/). For containerization of the applications.
   - [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/). To interact with your kubernetes cluster.
   - [Minikube](https://github.com/kubernetes/minikube). Recommended for Linux hosts (also supports Mac/Windows).
   - [Virtualbox](https://www.virtualbox.org/). Used as a driver for minikube.
   - [skaffold]( https://skaffold.dev/docs/install/) ([ensure version ≥v1.10](https://github.com/GoogleContainerTools/skaffold/releases))

1) **Start the minikube cluster**

   In the root directory run the following command:

   ```bash
   sh setup-minikube.sh
   ```

2) **Deploy the database infrastructure**

   First the deploy the postgres operator

   ```bash
   cd databases_infrastructure
   sh setup_dev_environment.sh
   ```

   Wait till the postgres operator is online. You can check this by running the following command:


   ```bash
   kubectl get pods
   ```
   
   The 'status' of the postgres operator should have the value running

   ```bash
   NAME                                 READY   STATUS    RESTARTS   AGE
   postgres-operator-85978df8cf-kgb9z   1/1     Running   0          7s
   ```

   When the operator is running, you can deploy the database instances with the following command:

   ```bash
   kubectl apply -f manifests/services-cluster-deployment.yaml
   ```

3) **Deploy the service instracture**

   Starting from the root directory run the following script in the service_infrastructure directory.

   ```bash
   cd services_infrastructure
   sh setup_skaffold.sh
   ```

   After all the images are deployed you can update your host file with the following command:


   ```bash
   cd ..
   sh manage-hosts.sh
   ```


4) **Deploy the frontend**

   (As of now the frontend is not yet integrated in the kubernetes cluster. Therefore it is run locally.) 

   You can deploy the frontend by going to the frontend service directory and run the following commands:


   ```bash
   cd services_infrastructure/frontend
   npm init
   npm run dev
   ```

   Your frontend should then be available at: http://localhost:3000
