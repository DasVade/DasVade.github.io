---
layout: page
title: UR16e Manipulator Control
description: Model-based torque control and real-time trajectory optimization
img: assets/img/ur16e_cover.jpg
importance: 1
category: research
related_publications: false
---

Developed a complete **model-based control framework** for the 6-DOF UR16e robotic arm, focusing on inverse dynamics control, trajectory optimization, and torque-level feedback under ROS and Python.

This project served as a bridge between analytical control methods and data-driven modeling. The implemented controller achieved high-precision trajectory tracking with under 1° average error in simulation.

---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ur16e_simulation.png" title="UR16e simulation environment" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ur16e_control_loop.png" title="Control structure diagram" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ur16e_joint_tracking.png" title="Joint trajectory tracking" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="caption">
    Left: Gazebo-based simulation of UR16e; Middle: Model-based torque control diagram; Right: Joint tracking results from the implemented controller.
</div>

---

### 🧩 Key Components

- **Dynamic modeling:** Derived equations of motion from the URDF model and verified inertia parameters.  
- **Controller design:** Combined feedforward inverse dynamics and feedback torque regulation.  
- **Trajectory optimization:** Used polynomial interpolation to ensure smooth motion.  
- **Validation:** Compared PD and model-based controllers, showing significant improvement in tracking stability.

---

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ur16e_torque_plot.png" title="Torque control results" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ur16e_real_robot.png" title="UR16e hardware setup" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="caption">
    Left: Torque control output vs. reference; Right: UR16e experimental platform in the lab.
</div>

---

**Technologies Used:**  
Python · ROS · Gazebo · NumPy · Matplotlib · URSim

**Results:**  
Achieved precise joint-space tracking under variable payloads; developed extensible control scripts for future reinforcement learning integration.

[📂 GitHub Repository →](https://github.com/yourusername/ur16e-control)  
[📄 Project Report (PDF)](assets/pdf/ur16e_report.pdf)
