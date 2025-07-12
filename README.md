# 🧪 Interactive Model Analysis Workbench

An interactive notebook interface (like Jupyter) built using **React**, **Zustand**, and **Tailwind CSS**, enabling users to create, execute, and organize code cells in real-time via a Jupyter backend.

---

## 📦 Tech Stack

- React + TypeScript
- Zustand for state management
- Tailwind CSS for styling
- React Query for async APIs
- Jupyter Server (via Docker)
- WebSocket for real-time code execution
- `dnd-kit` for drag-and-drop
- `react-window` for cell virtualization

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interactive-workbench.git
cd interactive-workbench
```

### 2. Install dependencies

```bash
npm install
```

## ⚙️ Running the Jupyter Backend with Docker

### Prerequisite: Install Docker Desktop

Download and install Docker Desktop:
🔗 https://www.docker.com/products/docker-desktop

After installation:

```bash
docker --version
docker compose version
```

### Start the Jupyter server

```bash
git clone https://github.com/KnightKrusty/jupyter-backend-docker.git
cd jupyter-backend-docker/basic-example
docker compose up
```

### Access the server:

1. Go to `http://localhost:8000/hub/signup`
2. Register as:
    ```json
    {
      "username": "admin",
      "password": "yourpassword",
      "confirmPassword": "yourpassword"
    }
    ```
3. Go to `http://localhost:8000/hub/token` to generate a **Jupyter Token**

---

## 🔑 Replace Jupyter Token

In `Cell.tsx`, **replace** the placeholder:

```ts
const JUPYTER_TOKEN = "your_token_here"; // <-- Put your token here
```

---

## 🖥️ Run the App

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Cell.tsx
│   ├── CellList.tsx
│   ├── Notebook.tsx
│   └── NotebookList.tsx
├── store/
│   └── useStore.ts
├── utils/
│   └── websocket.ts
├── App.tsx
└── index.tsx
```