# Reference Architecture Consent Management in Data Spaces

**TNO uses these applications to show how consent management can be applied in a data space**. 
This application works on any Kubernetes cluster (such as a local one), as well as Cloud based
Kubernetes Engines. 


## Service Architecture

**The reference architecture** is composed of many components (micro-services) written in different
languages that talk to each other over REST.


| Service | language| Description  |
| ---------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [consent-manager-frontend](./infrastructure/consent-manager-frontend) | javascript | Exposes an HTTP server to serve the website. |
| [data-provider-frontend](./infrastructure/data-provider-frontend) | javascript | Exposes an HTTP server to serve the website. |
| [data-consumer-frontend](./infrastructure/data-consumer-frontend) | javascript | Exposes an HTTP server to serve the website. |
| [policy-broker-frontend](./infrastructure/policy-broker-frontend) | javascript | Exposes an HTTP server to serve the website. |
| [policy-catalogue-frontend](./infrastructure/policy-catalogue-frontend) | javascript | Exposes an HTTP server to serve the website. |


## Features

- **[Kubernetes](https://kubernetes.io)/[GKE](https://cloud.google.com/kubernetes-engine/):**
   The app is designed to run on Kubernetes (both locally on "Docker for
   Desktop", as well as on the cloud with GKE).