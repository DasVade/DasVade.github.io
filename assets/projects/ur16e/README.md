# UR16e project display assets

Copied from the public DasVade/UR16e-Robot-Dynamics project after verified Python
migration (PR #1, source commit b121846). These are generated result visuals;
no course archive, environment or private materials are copied.

- execution/planning MP4 and posters: docs/migration; same robot/obstacles as
  the integrated experiment. Planning is kinematic playback; execution renders
  the actual torque-driven states. Neither is hardware footage.
- comparison MP4/poster: preserved 6 s nominal PD+gravity versus CT experiment.
- payload MP4/poster: preserved nominal CT versus unmodeled 1 kg payload CT.
- integrated_errors.png: new RRT-path tracking errors.
- tracking_nominal.png, tracking_payload.png, torques.png: original verified
  per-joint comparisons, copied unchanged from docs/executed.

Videos use original 10 fps sample timing, matched scales for comparisons, and
no visual error amplification. Source group: Yixiao Liu, Yusen Wu, Huaqian Zhao.
Supplied model/mesh provenance and simulation limitations remain documented in
the public technical reports. Source repository visibility is unchanged.
