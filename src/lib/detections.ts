// Hand-placed "machine vision" annotations for photos in public/photos.
// Boxes are [x, y, width, height] as percentages of the image (0–100), so
// they stay aligned at any size. A photo without an entry simply shows no
// overlay. Labels read like model output: snake_case class + confidence.

export type Detection = {
  label: string;
  score: number;
  box: [number, number, number, number];
};

export const detections: Record<string, Detection[]> = {
  // Hoffman's Strawberries (hero image).
  "farm-2": [
    { label: "grower", score: 0.94, box: [7, 26, 16, 59] },
    { label: "person", score: 0.97, box: [43, 25.5, 17.5, 72] },
    { label: "person", score: 0.91, box: [64, 27.5, 13, 66] },
    { label: "person", score: 0.88, box: [75, 32.5, 13, 53] },
    { label: "strawberry_row", score: 0.83, box: [0, 80, 34, 20] },
  ],
  "farm-1": [
    { label: "person", score: 0.96, box: [2, 32, 14, 49] },
    { label: "person", score: 0.93, box: [42, 34, 9, 42] },
    { label: "person", score: 0.95, box: [82, 34, 16, 53] },
  ],
  "farm-3": [
    { label: "tree", score: 0.86, box: [23, 31, 26, 19] },
    { label: "person", score: 0.92, box: [14, 50, 15, 46] },
    { label: "backpack", score: 0.81, box: [10, 56, 11, 14] },
    { label: "person", score: 0.96, box: [44, 48, 25, 52] },
    { label: "person", score: 0.94, box: [75, 54, 25, 46] },
  ],
  "farm-4": [
    { label: "exhaust_stack", score: 0.79, box: [51, 6, 8, 27] },
    { label: "sap_evaporator", score: 0.87, box: [36, 33, 45, 45] },
    { label: "bucket", score: 0.76, box: [53, 71, 6, 11] },
    { label: "person", score: 0.93, box: [22, 50, 14, 42] },
    { label: "person", score: 0.9, box: [82, 51, 18, 41] },
  ],
  "farm-5": [
    { label: "person", score: 0.95, box: [24, 41, 13, 59] },
    { label: "person", score: 0.92, box: [48, 44, 11, 40] },
    { label: "person", score: 0.89, box: [61, 48, 15, 52] },
    { label: "sheep", score: 0.91, box: [76, 66, 20, 27] },
    { label: "livestock_fence", score: 0.77, box: [0, 64, 10, 34] },
  ],

  // Term orientation.
  "orientation-1": [
    { label: "projector", score: 0.82, box: [86, 24, 10, 6] },
    { label: "projector_screen", score: 0.96, box: [13, 37, 19, 15] },
    { label: "projector_screen", score: 0.95, box: [60, 37, 19, 15] },
    { label: "water_bottle", score: 0.78, box: [21, 81, 3, 9] },
    { label: "laptop", score: 0.88, box: [86, 74, 14, 14] },
  ],
  "orientation-2": [
    { label: "projector_screen", score: 0.94, box: [30, 53, 11, 9] },
    { label: "projector_screen", score: 0.93, box: [57, 52, 12, 10] },
    { label: "person", score: 0.87, box: [2, 65, 9, 13] },
    { label: "person", score: 0.95, box: [66, 68, 12, 22] },
    { label: "person", score: 0.92, box: [79, 69, 19, 31] },
  ],
  "orientation-3": [
    { label: "wall_clock", score: 0.89, box: [30, 34, 5, 7] },
    { label: "projector_screen", score: 0.97, box: [61, 35, 32, 34] },
    { label: "person", score: 0.94, box: [23, 58, 16, 21] },
  ],
  "orientation-4": [
    { label: "wall_clock", score: 0.9, box: [33, 32, 5, 7] },
    { label: "projector_screen", score: 0.95, box: [58, 38, 19, 25] },
    { label: "person", score: 0.96, box: [45, 50, 15, 44] },
    { label: "monitor", score: 0.84, box: [28, 68, 19, 13] },
    { label: "cardboard_box", score: 0.79, box: [79, 66, 21, 15] },
  ],
  "orientation-5": [
    { label: "projector_screen", score: 0.95, box: [17, 45, 19, 16] },
    { label: "projector_screen", score: 0.94, box: [65, 44, 22, 17] },
    { label: "backpack", score: 0.77, box: [66, 75, 9, 5] },
    { label: "laptop", score: 0.81, box: [89, 86, 11, 5] },
  ],

  // Upside Robotics visit.
  "upside-1": [
    { label: "sensor_mast", score: 0.84, box: [46, 6, 3, 48] },
    { label: "water_tank", score: 0.88, box: [62, 39, 17, 17] },
    { label: "robot", score: 0.97, box: [43, 53, 17, 26] },
    { label: "person", score: 0.95, box: [8, 30, 23, 70] },
    { label: "person", score: 0.93, box: [71, 57, 29, 43] },
  ],
  "upside-2": [
    { label: "person", score: 0.96, box: [17, 20, 13, 72] },
    { label: "person", score: 0.94, box: [70, 17, 14, 77] },
    { label: "guard_rail", score: 0.76, box: [0, 43, 12, 37] },
    { label: "person", score: 0.91, box: [56, 46, 14, 46] },
    { label: "robot", score: 0.98, box: [46, 62, 15, 38] },
  ],

  // Team photo and intro events.
  "team-cover": [
    { label: "projector_screen", score: 0.97, box: [38.5, 17, 28, 30] },
    { label: "person", score: 0.93, box: [19.8, 47, 7.8, 41] },
    { label: "person", score: 0.95, box: [45, 44, 6.5, 44] },
    { label: "person", score: 0.94, box: [86.5, 44, 9.5, 45] },
  ],
  "intro-1": [
    { label: "projector_screen", score: 0.96, box: [38, 17, 28, 31] },
    { label: "person", score: 0.92, box: [20, 47, 7.5, 41] },
    { label: "person", score: 0.94, box: [86.5, 44, 9.5, 45] },
  ],
  "intro-2": [
    { label: "projector_screen", score: 0.97, box: [25, 7, 50, 44] },
    { label: "person", score: 0.95, box: [65, 49, 10, 38] },
    { label: "laptop", score: 0.85, box: [80, 56, 7, 5] },
    { label: "camera_tripod", score: 0.78, box: [91.5, 53, 8, 27] },
    { label: "waste_bin", score: 0.72, box: [10, 68, 7, 13] },
  ],
};

export const detectionsFor = (name: string) => detections[name] ?? [];
