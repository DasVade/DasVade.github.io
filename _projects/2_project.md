---
layout: page
title: Optimal Control for Dynamic Systems
description: Implementation of iLQR and DDP algorithms for nonlinear trajectory optimization.
img: assets/img/optimal_control_cover.jpg
importance: 1
category: research
related_publications: false
---

Developed and analyzed **optimal control algorithms** for nonlinear dynamic systems, focusing on **iterative Linear Quadratic Regulator (iLQR)** and **Differential Dynamic Programming (DDP)** methods.  
This project explored how dynamic programming and second-order expansions can efficiently solve continuous-time control problems with nonlinearity and constraints.

---

<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/ilqr_block.png" title="Optimal control structure" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  High-level structure of the iterative LQR algorithm with forward rollout and backward pass optimization.
</div>

---

### 🧩 Problem Setup

- **System models:** unicycle, cart–pole, and double integrator.  
- **Objective:** minimize quadratic cost function  
  \[
  J = \sum_{t=0}^{T} (x_t^T Q x_t + u_t^T R u_t)
  \]
- **Approach:** linearize dynamics along nominal trajectories, use backward Riccati recursion to compute feedback gains.

---

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/cartpole_trajectory.png" title="Cart-pole trajectory" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/ilqr_convergence.png" title="Cost convergence curve" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  Left: optimized cart-pole swing-up trajectory.  
  Right: convergence of cost-to-go function under iLQR iterations.
</div>

---

### ⚙️ Key Features

- Implemented iLQR and DDP in **Python (NumPy)** and **MATLAB**.  
- Verified convergence and control stability across multiple nonlinear systems.  
- Compared gradient-based optimization with dynamic programming–based methods.  
- Built visualizations for trajectory evolution and value function contours.

---

### 🧠 Insights

- The iLQR backward pass improves numerical stability compared to naive gradient descent.  
- Warm-starting DDP with iLQR solutions reduces iterations by ~40%.  
- Highlighted the trade-off between accuracy and real-time feasibility for embedded control.

---

### 🧰 Tools

Python · NumPy · Matplotlib · SciPy · MATLAB

---

**Results:**  
Achieved real-time trajectory optimization (<50 ms per iteration) for the unicycle model; successfully validated DDP convergence properties on the cart–pole system.

[📄 Technical Report (PDF)](assets/pdf/optimal_control_report.pdf)  
[📂 GitHub Repository →](https://github.com/yourusername/optimal-control)
