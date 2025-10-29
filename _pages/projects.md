---
layout: page
title: Projects
permalink: /projects/
description: Selected engineering and research projects.
nav: true
nav_order: 3
display_categories: []
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" | reverse %}
  <div class="row row-cols-1 row-cols-md-2 justify-content-center">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
