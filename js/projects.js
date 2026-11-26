/* =====================================================================
   EDIT THIS FILE to customize the site. No HTML changes needed.
   Part 1: SITE (name, links, skills). Part 2: PROJECTS (one object each).
   ===================================================================== */
const SITE = {
  name: "Benjamin Lin",                       // shown in the hero
  tagline: "MIT EECS Student",
  about: "Hi! I'm an MIT Course 6-5 Electrical Engineering with Comupting student passionate about creating embedded systems, Machine Learning, FPGA, and PCB design.",
  // Quick facts shown under the hero. Add or remove rows freely.
  glance: [
    { k: "Education", v: "Massachusetts Institute of Technology" },
    { k: "Major", v: "Electrical Engineering with Computing" },
    { k: "Graduation", v: "2030" },
    { k: "Focus", v: "PCB Design, Power, Embedded Systems, FPGA, Machine Learning" }
  ],
  skills: {
    "Design tools": ["KiCad", "LTspice", "Onshape"],
    "Languages": ["C++", "Python", "Java"],
    "Hardware": ["I2C", "ESP8266", "RP Pico"]
  },
  learning: ["FPGA design (Verilog)", "Machine learning basics"],
  links: {                                  // replace with your real links
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username",
    email: "mailto:you@example.com",
    resume: "assets/resume.pdf"             // put your PDF at assets/resume.pdf
  }
};

/* Each project becomes a card on the home page and a full page at
   project.html?id=<id>. Delete any field you don't need; empty sections
   are hidden. Images go in assets/images/. For math, write LaTeX and
   double every backslash (\\frac). Tags drive the filter buttons. */
const PROJECTS = [
  {
    id: "vital-signs-monitor",
    title: "Vital Signs Monitor",
    tags: ["PCB", "Circuits", "Embedded"],
    tools: ["KiCad", "C++", "ESP8266", "AD8232", "MAX30102"],
    status: "In progress: schematic design",
    timeline: "Add dates, e.g. Jun 2026 to present",
    role: "Solo project: hardware, firmware, and testing",
    summary: "Multi-sensor monitor that computes real-time heart rate (ECG) and SpO2 (pulse oximetry).",
    problem: "Vital signs are usually measured by separate single-purpose devices. Add 1-2 sentences on why one combined device is useful.",
    goals: ["Read ECG (AD8232) and pulse oximetry (MAX30102) on one microcontroller", "Compute heart rate and SpO2 in real time", "Move from a breadboard prototype to a custom KiCad board"],
    constraints: ["Low-noise analog front end for the ECG", "Shared I2C bus between devices", "Add budget, board size, or power limits"],
    decisions: [
      { title: "ESP8266 as the MCU", why: "Add your reasoning: cost, Wi-Fi, familiarity.", alt: "Alternatives considered: add them." },
      { title: "Transistor-switched output drivers", why: "Add why: drive LEDs or loads without loading the MCU pins.", alt: "" }
    ],
    process: ["Prototype each sensor on a breadboard", "Write C++ firmware to compute heart rate and SpO2", "Capture the schematic in KiCad with a multi-device I2C bus", "Next: PCB layout, assembly, and validation"],
    math: [
      { label: "Heart rate from R-R interval", tex: "\\mathrm{HR} = \\frac{60}{T_{RR}}\\ \\text{bpm}", note: "T_RR is the time between R peaks in seconds." },
      { label: "SpO2 ratio-of-ratios (add your calibration)", tex: "R = \\frac{AC_{red}/DC_{red}}{AC_{ir}/DC_{ir}}", note: "Replace with the formula you use." }
    ],
    results: ["Add measured results, e.g. heart rate error vs. a reference device", "Add test graphs below"],
    lessons: ["Add what surprised you and what you would change"],
    next: ["Finish PCB layout and order boards"],
    links: [{ label: "GitHub repository", url: "https://github.com/benjaminlin19/ECG-Monitor" }],
    images: [
      { src: "assets/images/vitals-schematic.png", caption: "KiCad schematic: I2C bus and output drivers" },
      { src: "assets/images/vitals-ecg-plot.png", caption: "ECG test capture (add axis labels and units)" }
    ]
  },
  {
    id: "foldable-drone",
    title: "Foldable Drone",
    tags: ["PCB", "Embedded", "Circuits"],
    tools: ["Onshape", "KiCad", "C++", "RP Pico"],
    status: "In progress: embedded system design",
    timeline: "Add dates",
    role: "Solo project: mechanical and electrical design",
    summary: "Drone with retractable arms, designed to maximize thrust-to-weight in a compact folded form.",
    problem: "Add why a foldable drone: portability, storage, or the use case you have in mind.",
    goals: ["Chassis with retractable arms designed in Onshape", "Optimize weight-to-thrust ratio", "Embedded system: RP Pico, linear servos, all-in-one flight controller/ESC, radio receiver"],
    constraints: ["Total weight budget", "Battery and current limits", "Servo torque for folding arms"],
    decisions: [{ title: "Linear servos for the fold mechanism", why: "Add your reasoning.", alt: "Alternatives considered: add them." }],
    process: ["Define weight and thrust targets", "Model the chassis and arms in Onshape", "Select the flight controller/ESC, receiver, and servos", "Next: wiring, firmware, and flight tests"],
    math: [{ label: "Thrust-to-weight ratio", tex: "\\mathrm{TWR} = \\frac{n\\,T_{motor}}{m\\,g}", note: "n motors, thrust T each, total mass m." }],
    results: ["Add weight breakdown and measured thrust"],
    lessons: ["Add lessons learned"],
    next: ["Build and test fold mechanism"],
    links: [],
    images: [{ src: "assets/images/drone-cad.png", caption: "Onshape model with arms folded and extended" }]
  },
  {
    id: "multiphase-buck-converter",
    title: "Multi-Phase Buck Converter",
    tags: ["Power Electronics", "LTspice", "Circuits"],
    tools: ["LTspice"],
    status: "Simulation",
    timeline: "Add dates",
    role: "Solo project: design and simulation",
    summary: "Multi-phase synchronous buck converter simulated in LTspice. Add your key spec, e.g. input, output, and load current.",
    problem: "Add the application and why multiple phases help (lower ripple, shared current, faster transient response).",
    goals: ["Meet your output voltage and current spec", "Add ripple and efficiency targets"],
    constraints: ["Add input range, switching frequency, and component limits"],
    decisions: [{ title: "Number of phases", why: "Add your reasoning.", alt: "Alternatives considered: add them." }],
    process: ["Choose topology and specs", "Size inductors and capacitors", "Simulate steady state and load transients in LTspice", "Document results"],
    math: [
      { label: "Ideal buck duty cycle", tex: "D = \\frac{V_{out}}{V_{in}}", note: "" },
      { label: "Inductor ripple current per phase", tex: "\\Delta I_L = \\frac{(V_{in}-V_{out})\\,D}{L\\,f_{sw}}", note: "" }
    ],
    results: ["Add ripple, efficiency, and transient response numbers"],
    lessons: ["Add lessons learned"],
    next: [],
    links: [],
    images: [
      { src: "assets/images/buck-schematic.png", caption: "LTspice schematic" },
      { src: "assets/images/buck-waveforms.png", caption: "Simulated waveforms (label axes and units)" }
    ]
  }
];
