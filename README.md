# Liver RFA Simulator

A full-stack simulation system for **Liver Radiofrequency Ablation (RFA)** with GPU-accelerated Python backend (Flask + PyTorch/CUDA), React frontend, and Docker deployment.

---

## 🔧 Requirements

- Docker Desktop
- NVIDIA GPU with drivers
- WSL 2 (Windows)
- NVIDIA Container Toolkit

Verify GPU support:

```bash
nvidia-smi
docker run --rm --gpus all nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Liver_RFA_Simulator
```

### 2. Create data directory

```bash
mkdir -p backend/data
```

### 3. Start the system

```bash
docker compose up --build
```

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173

---

## 🧠 Backend API

| Method | Route                | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/`                  | Health check          |
| POST   | `/predict`           | Run RFA simulation    |
| GET    | `/videos/<filename>` | Fetch generated video |

**Example:**

```bash
curl -X POST http://localhost:5000/predict
```

---

## 🎥 Video Storage

Generated videos persist at:

```
backend/data/simulation_videos
```

---

## 🛑 Stopping the System

```bash
docker compose down
```

---

## 🧪 Debugging

```bash
# Check containers
docker compose ps

# View logs
docker compose logs backend

# Verify GPU
docker compose exec backend python3 -c "import torch; print(torch.cuda.is_available())"
```
