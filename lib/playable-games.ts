export type PlayEngine =
  | "action"
  | "trajectory"
  | "economy"
  | "grid"
  | "defense"
  | "snake"
  | "paddle"
  | "cluster"
  | "color-sort"
  | "reaction"
  | "lab";

export type PlayableGameConfig = {
  engine: PlayEngine;
  variant: string;
  objective: string;
  controls: string[];
  tip: string;
};

const configs = new Map<string, PlayableGameConfig>();

function register(slugs: string[], config: PlayableGameConfig) {
  for (const slug of slugs) {
    configs.set(slug, config);
  }
}

register(
  [
    "bike-physics",
    "wobble-car",
    "drift-challenge",
    "delivery-route-driving",
    "escape-chase-driving",
    "taxi-pickup-game",
    "fuel-management-racer",
    "coin-rush-collector",
    "missile-dodge",
    "asteroids-clone",
  ],
  {
    engine: "action",
    variant: "driver",
    objective: "Stay alive, collect pickups, and stack score by controlling lane changes under pressure.",
    controls: ["Arrow keys or A/D to steer", "Space to boost"],
    tip: "Pickups refill the bar that powers your boost and keeps the run alive longer.",
  }
);

register(
  [
    "neon-trail-survival",
    "spike-lane-dodger",
    "endless-cube-dash",
    "time-freeze-dodger",
    "reverse-controls-challenge",
  ],
  {
    engine: "action",
    variant: "runner",
    objective: "Dodge incoming hazards, survive the pace increase, and build a longer streak.",
    controls: ["Arrow keys or A/D to switch lanes", "F to freeze time when charged"],
    tip: "The freeze move is strongest when two hazards line up at once.",
  }
);

register(
  ["gravity-flip-platformer", "ice-and-lava-platformer", "time-stop-platformer"],
  {
    engine: "action",
    variant: "platform",
    objective: "Hop over ground threats and use your special move at the right moment to keep the run going.",
    controls: ["Left and right arrows to move", "Space to jump", "G to trigger the special move"],
    tip: "Your special move changes by game, but the best runs use it sparingly.",
  }
);

register(
  ["ball-bounce-precision", "stickman-grappling", "ramp-jump", "marble-launcher", "mini-golf-puzzle", "car-stunt-game"],
  {
    engine: "trajectory",
    variant: "arc",
    objective: "Dial in angle and power, then launch clean shots into the target zone.",
    controls: ["Use the sliders to set angle and power", "Press Launch"],
    tip: "Power matters less than angle once the target gets higher.",
  }
);

register(
  [
    "tiny-fishing-style",
    "arcade-owner-sim",
    "mining-upgrade-game",
    "candy-machine-tycoon",
    "idle-bakery",
    "robot-factory-sim",
  ],
  {
    engine: "economy",
    variant: "builder",
    objective: "Grow your output by clicking for resources, buying upgrades, and letting income build on its own.",
    controls: ["Click the main action button", "Buy upgrades when you can afford them"],
    tip: "Early auto income makes later upgrades arrive much faster.",
  }
);

register(["museum-heist-puzzle", "guard-vision-maze", "maze-infiltrator"], {
  engine: "grid",
  variant: "stealth",
  objective: "Move through the board, avoid guard vision, and reach the exit without getting spotted.",
  controls: ["Arrow keys to move one tile", "R to reset the board"],
  tip: "Pause a second and study patrol lines before you rush.",
});

register(["parking-fury-style", "traffic-lane-merge", "tight-turn-parking", "garage-escape-driving"], {
  engine: "grid",
  variant: "parking",
  objective: "Navigate around blockers and park on the finish tile in as few moves as possible.",
  controls: ["Arrow keys to drive one tile", "R to reset the puzzle"],
  tip: "Look at the last two turns first, then work backward.",
});

register(["maze-chaser", "magnet-puzzle-game"], {
  engine: "grid",
  variant: "maze",
  objective: "Collect pickups across the board while avoiding the roaming chaser and finish on the exit tile.",
  controls: ["Arrow keys to move", "R to reset the maze"],
  tip: "Clear the safest corner first so the path back stays open.",
});

register(["chess-puzzle-battle", "turn-based-board-tactics", "capture-the-nodes-strategy"], {
  engine: "grid",
  variant: "tactics",
  objective: "Capture more control nodes than the rival unit before the turn limit runs out.",
  controls: ["Arrow keys to move", "Enter to claim a node"],
  tip: "Center control is usually worth more than chasing one far node.",
});

register(
  [
    "tower-defense",
    "castle-lane-defender",
    "base-upgrade-defense",
    "alien-wave-defense",
    "garden-defense",
    "mini-war-sim",
    "path-blocking-defense",
  ],
  {
    engine: "defense",
    variant: "lanes",
    objective: "Place defenders, stop the wave, and protect your base while enemies get tougher.",
    controls: ["Click a lane button to build there", "Spend credits on upgrades"],
    tip: "Spreading one tower per lane is safer than stacking early.",
  }
);

register(["snake-with-upgrades"], {
  engine: "snake",
  variant: "classic",
  objective: "Eat pickups, grow longer, and survive tighter turns while your score keeps rising.",
  controls: ["Arrow keys to steer", "R to restart"],
  tip: "Leave yourself room before grabbing a pickup near the wall.",
});

register(["bubble-shooter", "match-3-combos", "fraction-merge-puzzle"], {
  engine: "cluster",
  variant: "board",
  objective: "Click matching groups to clear the board, chain combos, and push your score higher.",
  controls: ["Click connected groups of two or more"],
  tip: "Big clears create cleaner refills and stronger follow-up moves.",
});

register(["color-sorting-game"], {
  engine: "color-sort",
  variant: "tubes",
  objective: "Sort each tube into a single color using as few moves as possible.",
  controls: ["Click one tube, then another to pour"],
  tip: "Keep one tube open as your breathing room.",
});

register(["pong-remix"], {
  engine: "paddle",
  variant: "duel",
  objective: "Keep the ball in play, outscore the bot, and survive the faster remix speed.",
  controls: ["Arrow keys or W/S to move your paddle", "R to reset"],
  tip: "Meet the ball early to create sharper angles.",
});

register(["reaction-click-duel"], {
  engine: "reaction",
  variant: "timing",
  objective: "Wait for the signal, click fast, and build a better reaction streak.",
  controls: ["Click when the panel turns live"],
  tip: "Don’t pre-click. False starts kill the round.",
});

register(
  ["typing-racer", "math-shooter", "word-ladder-game", "geography-guesser", "pattern-memory-game", "speed-arithmetic-runner", "logic-grid-puzzle", "spelling-dodge-game", "equation-balance-game"],
  {
    engine: "lab",
    variant: "challenge",
    objective: "Beat short rapid-fire rounds built around speed, memory, and clean decision making.",
    controls: ["Use the buttons or inputs shown in the panel"],
    tip: "Fast correct answers matter more than perfect streaks at the start.",
  }
);

export function getPlayableGameConfig(slug: string) {
  return configs.get(slug) ?? null;
}

export function isPlayableGame(slug: string) {
  return slug === "drift-boss" || configs.has(slug);
}
