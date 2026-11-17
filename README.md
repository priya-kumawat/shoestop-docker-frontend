# ShoeStop — Full-Stack Containerized E-Commerce Storefront

A production-deployed MERN e-commerce web application built with **React, Vite, Bootstrap, Node.js, Express, and MongoDB Atlas**, containerized with **Docker & Nginx**, automated via **GitHub Actions CI/CD**, and hosted on **Render**.

## Live Deployment
- **Live Storefront:** [https://shoestop-docker-frontend.onrender.com](https://shoestop-docker-frontend.onrender.com)
- **Backend API & Health Telemetry:** [https://shoestop-docker-backend.onrender.com/api/health](https://shoestop-docker-backend.onrender.com/api/health)

## DevOps & Engineering Architecture
```
[User Browser]
      │
      ▼
[Frontend Container: React + Nginx] ──► GitHub Actions CI ──► Render CD
      │
      ▼ (REST API + JWT Bearer Auth)
[Backend Container: Node.js + Express] ──► GitHub Actions CI ──► Render CD
      │
      ▼
[MongoDB Atlas Cloud Cluster] (users, products, carts, orders)
```

## Key Features
- **Stateless JWT Authentication:** Secure registration, login, session persistence, and per-user data isolation.
- **Interactive Storefront:** Real-time product search, brand filter pills, price sorting, and live cart item counter.
- **Persistent Shopping Cart & Order History:** Add/remove footwear, adjust quantities, checkout with order summary, and view past purchases under **My Orders**.
- **Production Observability:** Dedicated `/api/health` endpoint exposing live uptime, memory usage, and MongoDB connection state.
