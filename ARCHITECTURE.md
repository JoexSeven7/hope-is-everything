# Project Architecture & Flow

![Architecture Diagram](C:/Users/JOEX7/.gemini/antigravity/brain/71ffb238-b908-4234-a572-49cd45af12a2/project_architecture_diagram_1768983515691.png)

> [!TIP]
> This is a high-level visual representation. For an interactive view, open [project_map.html](file:///c:/Users/JOEX7/Desktop/Programfile/donation/hope-is-everything/project_map.html) in your browser.

## 1. Folder Structure Diagram

The project is split into a **Vite/React Frontend** and a **Node.js/Express Backend**.

```mermaid
graph TD
    Root[hope-is-everything]
    
    %% Root Level
    Root --> Frontend[Frontend - root/src]
    Root --> Backend[Backend - backend/]
    Root --> Config[Config Files]
    
    %% Frontend Structure
    Frontend --> F_Src[src/]
    F_Src --> Pages[pages/]
    F_Src --> Components[components/]
    F_Src --> Lib[lib/ - Stripe Logic]
    F_Src --> Constants[constants/ - Pricing/Impact]
    F_Src --> Assets[assets/]
    
    %% Backend Structure
    Backend --> B_Routes[routes/]
    Backend --> B_Controllers[controllers/]
    Backend --> B_Models[models/]
    Backend --> B_Middleware[middleware/]
    Backend --> B_Server[server.js]
    
    %% Config Files
    Config --> Vite[vite.config.ts]
    Config --> Tailwind[tailwind.config.js]
    Config --> PKG_F[package.json - Frontend]
    Config --> PKG_B[package.json - Backend]
```

## 2. Donation Flow Diagram

This diagram shows how a donation request moves through the system.

```mermaid
sequenceDiagram
    participant User as Donor (Browser)
    participant Front as React App
    participant StripeJS as Stripe Elements
    participant API as Node.js Backend
    participant DB as MongoDB
    participant StripeAPI as Stripe API Server

    User->>Front: Enter Donation Details
    Front->>StripeJS: Initialize Payment Element
    StripeJS-->>User: Show Payment UI
    
    User->>Front: Click "Donate Now"
    Front->>API: POST /api/donations
    Note right of API: Validates data & creates Pending record
    
    API->>StripeAPI: Create PaymentIntent
    StripeAPI-->>API: client_secret
    
    API->>DB: Save Donation (ID, Intent_ID, Status: Pending)
    API-->>Front: Return client_secret & donation_id
    
    Front->>StripeJS: Confirm Payment (with client_secret)
    StripeJS->>StripeAPI: Process Transaction
    StripeAPI-->>StripeJS: Success / Failure
    
    StripeJS-->>Front: Payment Status
    
    alt If Success
        Front->>User: Show Success Page
        Note over API,DB: (Optional) Webhook updates status to Completed
    else If Failure
        Front->>User: Show Error Message
    end
```

## 3. Component Responsibilities

| Directory | Responsibility |
| :--- | :--- |
| `src/pages` | Main application views (Home, Donate, About, etc.) |
| `src/components` | Reusable UI elements (Header, Footer, Calculator) |
| `src/lib` | External service integrations (Stripe, API clients) |
| `backend/models` | Database schemas (User, Donation) |
| `backend/controllers` | Business logic for processing requests |
| `backend/routes` | API endpoint definitions |
