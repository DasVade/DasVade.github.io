---
layout: page
title: UR16e Industrial Robot — Modeling, Planning, and Control
description: Kinematics, dynamics, collision detection, RRT+B-spline planning, time-optimal trajectory generation, and computed-torque/robust control with Simulink-URDF simulation.
img: assets/img/ur16e_cover.jpg
importance: 2
category: research
related_publications: false
---

This project focuses on the **UR16e industrial manipulator**, completing a full pipeline from **kinematic and dynamic modeling**, **collision detection**, **path planning and smoothing**, and **time-optimal trajectory generation** to **controller design and simulation**.  
The system is validated by importing the **SolidWorks assembly into MATLAB/Simulink** through **URDF**, supporting a flexible manufacturing scenario involving pick-and-place and palletizing tasks.

---

## 1. Kinematic and Dynamic Modeling

- **Forward Kinematics (FK):** Established using **DH parameters** for a 6-DOF joint chain; results verified with MATLAB’s Robotics Toolbox.  
- **Inverse Kinematics (IK):** Applied the **Newton–Raphson iterative method** (after testing the spherical-wrist approximation) to solve joint angles; consistent with toolbox results.  
- **Inverse Dynamics (ID):** Implemented the **Newton–Euler recursive algorithm** from end-effector to base to compute joint torques.  
- **Forward Dynamics (FD):** Derived \(M(q)\), \(C(q,\dot q)\), and \(G(q)\) via the Lagrangian formulation:
  \[
  M(q)\ddot q + C(q,\dot q)\dot q + G(q) = \tau
  \]
  enabling computation of joint accelerations consistent with the analytical model.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/ur16e_dh_table.png" title="DH parameters of UR16e" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/ur16e_fk_ik.png" title="Consistency check between FK/IK and toolbox results" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 2. Collision Detection via Capsule Approximation

- **Link Modeling:** Each link is approximated as a **capsule** (cylinder with hemispherical ends), while obstacles are enclosed by **bounding spheres**.  
- **Environment Collision:** Reduced to computing the **minimum point–segment distance** versus the sum of radii.  
- **Self-Collision:** Converted to **segment–segment distance** checks between link pairs. Four relative cases are defined for robust detection.  
- During motion planning, the detector is called online rather than pre-computing the entire free space.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/capsule_model.png" title="Capsule-based link and spherical obstacle approximation" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/segment_distance.png" title="Geometry of point-/segment-distance computation" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 3. Path Planning and Smoothing

- **Task Scenario:** pick–place and palletizing operations in a flexible manufacturing cell.  
- **RRT:** Implemented in the **joint space**, adopting a **goal-biasing strategy** for faster convergence.  
- **B-Spline Smoothing:** Applied **cubic B-spline interpolation** (de Boor–Cox recursion and matrix form) to smooth RRT piecewise paths.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/rrt_tree.png" title="RRT expansion in joint space" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/bspline_smoothing.png" title="B-spline-smoothed end-effector trajectory" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 4. Time-Optimal Trajectory Generation

Under joint **velocity**, **acceleration**, and **torque limits**, the trajectory timing is optimized to minimize total execution time:
\[
\min \sum_k \Delta t_k
\]
A nonlinear time-scaling and re-parameterization ensure that all kinematic and dynamic constraints are satisfied.

---

## 5. Control Design and Robustness Evaluation

- **Computed-Torque Control (CTC):**
  \[
  \tau = M(q)(\ddot q_d + K_p e + K_d \dot e) + C(q,\dot q)\dot q + G(q)
  \]
  achieving accurate tracking of the reference trajectory.  
- **Robust Control:** Added compensation for model uncertainties; stability guaranteed by Lyapunov conditions on \(P,Q\).  
- **Disturbance Tests:** Injected **joint measurement noise**, **torque noise**, and parameter perturbations in \(M(q)\) and \(G(q)\) to evaluate tracking stability.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/ctc_block.png" title="Computed-torque control structure" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/robust_block.png" title="Robust control framework and simulation" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 6. System-Level Simulation (URDF → Simulink)

- Defined coordinate frames via MDH/DH and exported **URDF** from SolidWorks.  
- Imported into **Simulink** using `smimport`, built the system diagram, and simulated the collision-free trajectory animation.

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/smimport_sim.png" title="URDF-to-Simulink system simulation" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

### Tools  
MATLAB / Simulink · Robotics System Toolbox · Custom geometric collision module (capsule–sphere) · RRT + B-spline · SolidWorks → URDF

### Files  
- Report PDF: `assets/pdf/ur16e_report.pdf`  
- Code/Simulation: [GitHub Repository →](https://github.com/yourusername/ur16e-control)
