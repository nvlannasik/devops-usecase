# DevOps Usecases

This repository contains the DevOps usecases that goal is to provide a CI/CD pipeline for a three simple backend services (User, Order, Product) that are deployed on a kubernetes cluster. The kubernetes cluster is a self hosted cluster on a microcluster of Raspberry Pi 4 Model B. The cluster is connect to the internet using Cloudflare Argo Tunnel. The CI/CD Pipeline is managed by Github Actions and ArgoCD.

## Project Structure

- [ ] `.github/`: contains github actions workflow.
- [ ] `App/`: contains the backend services.
  - [ ] `order-nodejs/`: contains the order service written in nodejs.
  - [ ] `product-nodejs/`: contains the product service written in nodejs.
  - [ ] `user-go/`: contains the user service written in golang.
- [ ] `image/`: contains image for Markdown documentation.
- [ ] `manifest/`: contains the kubernetes manifest for the backend services.
  - [ ] `apps/`: contains the kubernetes manifest for the backend services.
  - [ ] `database/`: contains the kubernetes manifest for the mongodb database.
  - [ ] `openapi/`: contains the kubernetes manifest for the openapi deployment.

## Tech Stack

- Kubernetes (k3s Self Hosted on Microcluster of Raspberry Pi 4 Model B)
- Docker Registry (https://hub.docker.com/u/nvlannasik)
- ArgoCD
- Github Actions
- NodeJS (Order Service & Product Service)
- Golang (User Service)
- MongoDB
- Cloudflare
- Nginx Ingress Controller
- Cert Manager
- Longhorn
- MetalLB

## Architecture

![](/image/architecture.png)

## The CI/CD Pipeline

CI/CD Pipeline is managed by Github Actions. The pipeline is triggered when there is a release tag pushed to the repository. The pipeline will build the docker image for each backend services and push it to the docker registry. After that, the pipeline will change the image tag in the kubernetes manifest and push it to the repository. And finally, the pipeline will sync the kubernetes manifest to the kubernetes cluster using ArgoCD.

![Github Action](/image/github-action.png)

![ArgoCD](/image/argocd.png)

## The Kubernetes Cluster

The kubernetes cluster is a self hosted cluster on a microcluster of Raspberry Pi 4 Model B. The cluster is managed by ArgoCD and the ci/cd pipeline is managed by Github Actions.

![Kubernetes Cluster](/image/kubernetes.png)
![Kubernetes Cluster](/image/kubernetes-cluster-summary.png)
![Kubernetes Cluster](/image/kubernetes-object-overview.png)

## Additional Technical Documentation

- [Setup Kubernetes Cluster on Raspberry Pi 4 Model B](https://github.com/nvlannasik/microcluster-k3s-documentation)
- [OpenApi Specification](https://openapi.annasik.my.id)

## Author

- [Ahmad Naoval Annasik](https://github.com/nvlannasik)
