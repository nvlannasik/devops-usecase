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

CI/CD Pipeline is managed by Github Actions. The pipeline is triggered when there is a release tag pushed to the repository. The pipeline includes the following steps:

- Static Code Analysis
- Unit Testing
- Integration Testing
- e2e Testing
- Build & Push Docker Image to Docker Registry
- Change Image Tag on Kubernetes Manifest
- Sync Kubernetes Manifest to Kubernetes Cluster using ArgoCD

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
- [Setup ArgoCD on Kubernetes Cluster (Comming Soon)](#additional-technical-documentation)
- [Setup Github Actions for CI/CD Pipeline (Comming Soon)](#additional-technical-documentation)
- [Setup Cloudflare Argo Tunnel for Exposing Ingress on Kubernetes Cluster (Comming Soon)](#additional-technical-documentation)
- [Setup Prometheus and Grafana on Kubernetes (Comming Soon)](#additional-technical-documentation)

## Author

- [Ahmad Naoval Annasik](https://github.com/nvlannasik)
