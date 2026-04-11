"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Game } from "@/data/games";
import type { PlayableGameConfig } from "@/lib/playable-games";
import GameProgressCard from "@/components/GameProgressCard";

type ArenaEntity = {
  id: number;
  lane: number;
  row: number;
  type: "hazard" | "pickup" | "enemy";
};

type GridPoint = {
  x: number;
  y: number;
};

const GRID_SIZE = 8;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function seedFromSlug(slug: string) {
  let seed = 0;

  for (const char of slug) {
    seed = (seed * 31 + char.charCodeAt(0)) % 2147483647;
  }

  return seed || 1;
}

function createSeededRandom(seed: number) {
  let current = seed;

  return () => {
    current = (current * 48271) % 2147483647;
    return current / 2147483647;
  };
}

function pick<T>(items: T[], random: () => number) {
  return items[Math.floor(random() * items.length)];
}

function getEconomyLabels(slug: string) {
  switch (slug) {
    case "tiny-fishing-style":
      return { unit: "fish", action: "Cast line", upgradeA: "Better lure", upgradeB: "Longer boat", upgradeC: "Harbor crew" };
    case "arcade-owner-sim":
      return { unit: "tickets", action: "Open machine", upgradeA: "Prize wall", upgradeB: "Floor lights", upgradeC: "Weekend crowd" };
    case "mining-upgrade-game":
      return { unit: "ore", action: "Mine ore", upgradeA: "Sharper pick", upgradeB: "Drill cart", upgradeC: "Auto rig" };
    case "candy-machine-tycoon":
      return { unit: "candies", action: "Spin machine", upgradeA: "Sugar boost", upgradeB: "Flavor line", upgradeC: "Factory robot" };
    case "idle-bakery":
      return { unit: "rolls", action: "Bake batch", upgradeA: "Hot oven", upgradeB: "Mixer", upgradeC: "Night crew" };
    default:
      return { unit: "bots", action: "Build bot", upgradeA: "Servo arm", upgradeB: "Assembly line", upgradeC: "Smart core" };
  }
}

function getClusterTokens(slug: string) {
  switch (slug) {
    case "fraction-merge-puzzle":
      return ["1/8", "1/4", "1/3", "1/2"];
    case "match-3-combos":
      return ["R", "B", "Y", "G", "P"];
    default:
      return ["O", "C", "L", "V", "G"];
  }
}

function getLabPromptPool(slug: string) {
  switch (slug) {
    case "typing-racer":
      return [
        "pixel boosts beat panic",
        "mathshield keeps the pace clean",
        "short words win fast rounds",
      ];
    case "geography-guesser":
      return [
        { question: "Which country is Tokyo in?", options: ["Japan", "Brazil", "Kenya", "Spain"], answer: "Japan" },
        { question: "What continent is Chile in?", options: ["Europe", "South America", "Asia", "Africa"], answer: "South America" },
        { question: "Which city is in Canada?", options: ["Lima", "Seoul", "Toronto", "Oslo"], answer: "Toronto" },
      ];
    case "logic-grid-puzzle":
      return [
        {
          question: "Ava arrived before Ben. Ben arrived before Cruz. Who arrived last?",
          options: ["Ava", "Ben", "Cruz", "Nobody"],
          answer: "Cruz",
        },
        {
          question: "The blue book is in locker 3. The red book is not in locker 2. Which locker has the green book?",
          options: ["Locker 1", "Locker 2", "Locker 3", "None"],
          answer: "Locker 2",
        },
      ];
    case "spelling-dodge-game":
      return [
        { question: "Pick the correct spelling.", options: ["seperate", "separate", "seperete", "separite"], answer: "separate" },
        { question: "Pick the correct spelling.", options: ["occured", "occurred", "ocurred", "occurd"], answer: "occurred" },
      ];
    case "equation-balance-game":
      return [
        { question: "What number balances 6 + x = 15?", options: ["7", "8", "9", "10"], answer: "9" },
        { question: "What number balances 3x = 18?", options: ["4", "5", "6", "7"], answer: "6" },
      ];
    default:
      return [];
  }
}

function ActionGame({ slug, variant }: { slug: string; variant: string }) {
  const reverse = slug === "reverse-controls-challenge";
  const freezeGame = slug === "time-freeze-dodger";
  const platformGame = variant === "platform";
  const seed = useMemo(() => seedFromSlug(slug), [slug]);
  const random = useMemo(() => createSeededRandom(seed), [seed]);
  const [lane, setLane] = useState(2);
  const [plane, setPlane] = useState(0);
  const [energy, setEnergy] = useState(6);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [jumpTicks, setJumpTicks] = useState(0);
  const [freezeTicks, setFreezeTicks] = useState(0);
  const [entities, setEntities] = useState<ArenaEntity[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const nextId = useRef(1);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        setLane((current) => clamp(current + (reverse ? 1 : -1), 0, 4));
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        setLane((current) => clamp(current + (reverse ? -1 : 1), 0, 4));
      }

      if (event.key === " ") {
        event.preventDefault();
        if (platformGame) {
          setJumpTicks(2);
        } else {
          setEnergy((current) => clamp(current - 1, 0, 10));
          setScore((current) => current + 4);
        }
      }

      if ((event.key.toLowerCase() === "f" || event.key.toLowerCase() === "g") && energy >= 3) {
        if (freezeGame) {
          setFreezeTicks(3);
          setEnergy((current) => current - 3);
        }
      }

      if (platformGame && event.key.toLowerCase() === "g" && energy >= 2) {
        setPlane((current) => (current === 0 ? 1 : 0));
        setEnergy((current) => current - 2);
      }

      if (event.key.toLowerCase() === "r") {
        setEntities([]);
        setLane(2);
        setPlane(0);
        setEnergy(6);
        setScore(0);
        setLives(3);
        setJumpTicks(0);
        setFreezeTicks(0);
        setGameOver(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [energy, freezeGame, platformGame, reverse]);

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const interval = window.setInterval(() => {
      setEntities((current) => {
        const moved =
          freezeTicks > 0
            ? current
            : current
                .map((entity) => ({ ...entity, row: entity.row - 1 }))
                .filter((entity) => entity.row >= 0);

        const collide = moved.find(
          (entity) =>
            entity.row === 0 &&
            entity.lane === lane &&
            (!platformGame || entity.type !== "pickup" || plane === 0)
        );

        if (collide?.type === "hazard" || collide?.type === "enemy") {
          if (jumpTicks <= 0) {
            setLives((currentLives) => {
              const nextLives = currentLives - 1;
              if (nextLives <= 0) {
                setGameOver(true);
              }

              return nextLives;
            });
          }
        }

        if (collide?.type === "pickup") {
          setScore((currentScore) => currentScore + 10);
          setEnergy((currentEnergy) => clamp(currentEnergy + 2, 0, 10));
        }

        const filtered = moved.filter((entity) => entity !== collide);
        const spawnRoll = random();
        const spawnLane = Math.floor(random() * 5);
        const shouldSpawnPickup = spawnRoll > 0.75;

        if (spawnRoll > 0.25) {
          filtered.push({
            id: nextId.current++,
            lane: spawnLane,
            row: 8,
            type: shouldSpawnPickup ? "pickup" : variant === "driver" && spawnRoll > 0.58 ? "enemy" : "hazard",
          });
        }

        return filtered;
      });

      setJumpTicks((current) => Math.max(0, current - 1));
      setFreezeTicks((current) => Math.max(0, current - 1));
      setScore((current) => current + 1);
      setEnergy((current) => clamp(current + 0.15, 0, 10));
    }, platformGame ? 320 : 240);

    return () => window.clearInterval(interval);
  }, [freezeTicks, gameOver, jumpTicks, lane, plane, platformGame, random, variant]);

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Score {score}</span>
        <span>Lives {lives}</span>
        <span>Charge {Math.floor(energy)}</span>
      </div>

      <div className={`arena-board ${platformGame ? "arena-board--platform" : ""}`}>
        {Array.from({ length: 9 }).map((_, rowIndex) => (
          <div className="arena-row" key={rowIndex}>
            {Array.from({ length: 5 }).map((_, laneIndex) => {
              const boardRow = 8 - rowIndex;
              const entity = entities.find((item) => item.row === boardRow && item.lane === laneIndex);
              const isPlayerLane = lane === laneIndex && boardRow === 0;

              return (
                <div className="arena-cell" key={`${rowIndex}-${laneIndex}`}>
                  {entity ? (
                    <span
                      className={`arena-token arena-token--${entity.type} ${
                        platformGame && plane === 1 ? "arena-token--top" : ""
                      }`}
                    />
                  ) : null}
                  {isPlayerLane ? (
                    <span className={`arena-player ${jumpTicks > 0 ? "arena-player--jump" : ""} ${plane === 1 ? "arena-player--top" : ""}`} />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="control-row">
        <button className="ui-button ui-button--ghost" onClick={() => setLane((current) => clamp(current - 1, 0, 4))} type="button">
          Left
        </button>
        <button className="ui-button ui-button--ghost" onClick={() => setLane((current) => clamp(current + 1, 0, 4))} type="button">
          Right
        </button>
        <button
          className="ui-button ui-button--ghost"
          onClick={() => {
            if (platformGame) {
              setJumpTicks(2);
            } else {
              setScore((current) => current + 4);
            }
          }}
          type="button"
        >
          {platformGame ? "Jump" : "Boost"}
        </button>
      </div>

      {gameOver ? <p className="game-message">Round over. Press R or use the controls to restart the flow.</p> : null}
    </div>
  );
}

function TrajectoryGame({ slug }: { slug: string }) {
  const seed = useMemo(() => seedFromSlug(slug), [slug]);
  const [angle, setAngle] = useState(48);
  const [power, setPower] = useState(62);
  const [attempts, setAttempts] = useState(0);
  const [hits, setHits] = useState(0);
  const [path, setPath] = useState<[number, number][]>([]);
  const [message, setMessage] = useState("Launch a shot.");

  const target = useMemo(() => {
    const x = 58 + ((seed + attempts * 19) % 28);
    const y = 28 + ((seed + attempts * 13) % 24);
    return { x, y };
  }, [attempts, seed]);

  const launch = () => {
    const radians = (angle * Math.PI) / 180;
    const points: [number, number][] = [];
    let hit = false;

    for (let tick = 0; tick < 42; tick += 1) {
      const t = tick / 10;
      const x = 12 + Math.cos(radians) * power * 0.38 * t;
      const y = 90 - Math.sin(radians) * power * 0.55 * t + 8 * t * t;
      const point: [number, number] = [x, y];
      points.push(point);

      const dx = x - target.x;
      const dy = y - target.y;

      if (Math.sqrt(dx * dx + dy * dy) < 7) {
        hit = true;
      }
    }

    setPath(points);
    setAttempts((current) => current + 1);

    if (hit) {
      setHits((current) => current + 1);
      setMessage("Clean hit. New target loaded.");
    } else {
      setMessage("Close. Adjust the angle and try again.");
    }
  };

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Hits {hits}</span>
        <span>Shots {attempts}</span>
        <span>Target {target.x.toFixed(0)},{target.y.toFixed(0)}</span>
      </div>

      <svg viewBox="0 0 100 100" className="trajectory-board" role="img" aria-label="trajectory game board">
        <rect x="0" y="0" width="100" height="100" rx="8" />
        <line x1="0" y1="90" x2="100" y2="90" />
        <circle cx={target.x} cy={target.y} r="5.2" className="trajectory-target" />
        {path.length > 1 ? (
          <polyline
            className="trajectory-path"
            points={path.map(([x, y]) => `${x},${y}`).join(" ")}
          />
        ) : null}
        {path.length > 0 ? <circle cx={path[path.length - 1][0]} cy={path[path.length - 1][1]} r="2.4" className="trajectory-ball" /> : null}
        <rect x="10" y="84" width="6" height="6" className="trajectory-launcher" />
      </svg>

      <div className="slider-stack">
        <label className="slider-label">
          Angle
          <input type="range" min="20" max="75" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
        </label>
        <label className="slider-label">
          Power
          <input type="range" min="35" max="90" value={power} onChange={(event) => setPower(Number(event.target.value))} />
        </label>
      </div>

      <div className="control-row">
        <button className="ui-button" onClick={launch} type="button">
          Launch
        </button>
      </div>

      <p className="game-message">{message}</p>
    </div>
  );
}

function EconomyGame({ slug }: { slug: string }) {
  const labels = getEconomyLabels(slug);
  const [wallet, setWallet] = useState(0);
  const [perClick, setPerClick] = useState(1);
  const [perSecond, setPerSecond] = useState(0);
  const [upgrades, setUpgrades] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWallet((current) => current + perSecond);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [perSecond]);

  const costs = [12 + upgrades[0] * 10, 35 + upgrades[1] * 24, 90 + upgrades[2] * 45];

  const buy = (index: number) => {
    const cost = costs[index];
    setWallet((currentWallet) => {
      if (currentWallet < cost) {
        return currentWallet;
      }

      setUpgrades((currentUpgrades) => {
        const next = [...currentUpgrades];
        next[index] += 1;
        return next;
      });

      if (index === 0) {
        setPerClick((current) => current + 1);
      }

      if (index === 1) {
        setPerSecond((current) => current + 2);
      }

      if (index === 2) {
        setPerSecond((current) => current + 6);
      }

      return currentWallet - cost;
    });
  };

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>{Math.floor(wallet)} {labels.unit}</span>
        <span>Tap +{perClick}</span>
        <span>Auto +{perSecond}/sec</span>
      </div>

      <div className="economy-core">
        <button className="economy-button" onClick={() => setWallet((current) => current + perClick)} type="button">
          {labels.action}
        </button>
      </div>

      <div className="economy-upgrades">
        {[
          { title: labels.upgradeA, text: "+1 click", cost: costs[0] },
          { title: labels.upgradeB, text: "+2/sec", cost: costs[1] },
          { title: labels.upgradeC, text: "+6/sec", cost: costs[2] },
        ].map((upgrade, index) => (
          <button className="upgrade-card" key={upgrade.title} onClick={() => buy(index)} type="button">
            <strong>{upgrade.title}</strong>
            <span>{upgrade.text}</span>
            <em>Cost {upgrade.cost}</em>
          </button>
        ))}
      </div>
    </div>
  );
}

function buildGridMap(slug: string, variant: string) {
  const wallRows = new Set(["1,1", "1,2", "1,5", "2,5", "3,2", "4,2", "5,4", "6,4"]);

  if (variant === "parking") {
    return {
      start: { x: 0, y: 7 },
      goal: { x: 7, y: 0 },
      walls: new Set(["1,6", "2,6", "4,5", "5,5", "5,3", "3,2", "4,2", "1,1"]),
      pickups: [] as GridPoint[],
      nodes: [] as GridPoint[],
      guards: [] as GridPoint[],
    };
  }

  if (variant === "maze") {
    return {
      start: { x: 0, y: 0 },
      goal: { x: 7, y: 7 },
      walls: wallRows,
      pickups: [
        { x: 0, y: 6 },
        { x: 3, y: 4 },
        { x: 6, y: 2 },
      ],
      nodes: [] as GridPoint[],
      guards: [{ x: 7, y: 0 }],
    };
  }

  if (variant === "tactics") {
    return {
      start: { x: 0, y: 7 },
      goal: { x: 7, y: 0 },
      walls: new Set(["2,2", "5,5"]),
      pickups: [] as GridPoint[],
      nodes: [
        { x: 1, y: 3 },
        { x: 3, y: 1 },
        { x: 4, y: 6 },
        { x: 6, y: 3 },
      ],
      guards: [{ x: 7, y: 0 }],
    };
  }

  return {
    start: { x: 0, y: 7 },
    goal: { x: 7, y: 0 },
    walls: wallRows,
    pickups: [{ x: 5, y: 6 }],
    nodes: [] as GridPoint[],
    guards: [
      { x: slug === "guard-vision-maze" ? 3 : 5, y: slug === "guard-vision-maze" ? 3 : 1 },
      { x: 6, y: 5 },
    ],
  };
}

function GridGame({ slug, variant }: { slug: string; variant: string }) {
  const baseMap = useMemo(() => buildGridMap(slug, variant), [slug, variant]);
  const [player, setPlayer] = useState(baseMap.start);
  const [turns, setTurns] = useState(0);
  const [message, setMessage] = useState("Reach the objective.");
  const [score, setScore] = useState(0);
  const [pickups, setPickups] = useState(baseMap.pickups);
  const [guards, setGuards] = useState(baseMap.guards);
  const [captured, setCaptured] = useState<string[]>([]);

  const resetBoard = useCallback((nextMessage = "Reach the objective.") => {
    setPlayer(baseMap.start);
    setTurns(0);
    setMessage(nextMessage);
    setPickups(baseMap.pickups);
    setGuards(baseMap.guards);
    setCaptured([]);
  }, [baseMap]);

  const movePlayer = useCallback((dx: number, dy: number) => {
    const next = { x: clamp(player.x + dx, 0, GRID_SIZE - 1), y: clamp(player.y + dy, 0, GRID_SIZE - 1) };
    if (baseMap.walls.has(`${next.x},${next.y}`)) {
      return;
    }

    setPlayer(next);
    setTurns((current) => current + 1);
    let nextPickups = pickups;
    let nextGuards = guards;

    if (variant === "stealth") {
      const spotted = guards.some((guard) => {
        if (guard.x === next.x && Math.abs(guard.y - next.y) <= 2) return true;
        if (guard.y === next.y && Math.abs(guard.x - next.x) <= 2) return true;
        return false;
      });

      if (spotted) {
        resetBoard("Spotted. Board reset.");
        return;
      }
    }

    if (variant === "maze") {
      nextPickups = pickups.filter((pickup) => !(pickup.x === next.x && pickup.y === next.y));
      setPickups(nextPickups);

      nextGuards = guards.map((guard) => ({
        x: clamp(guard.x + Math.sign(next.x - guard.x), 0, GRID_SIZE - 1),
        y: clamp(guard.y + Math.sign(next.y - guard.y), 0, GRID_SIZE - 1),
      }));
      setGuards(nextGuards);

      if (nextGuards.some((guard) => guard.x === next.x && guard.y === next.y)) {
        resetBoard("Caught in the maze. Board reset.");
        return;
      }
    }

    if (variant === "tactics") {
      const key = `${next.x},${next.y}`;
      if (baseMap.nodes.some((node) => `${node.x},${node.y}` === key) && !captured.includes(key)) {
        setCaptured((current) => [...current, key]);
        setScore((current) => current + 1);
      }
    }

    const onGoal = next.x === baseMap.goal.x && next.y === baseMap.goal.y;
    if (onGoal && (variant !== "maze" || nextPickups.length === 0)) {
      setScore((current) => current + 1);
      resetBoard("Objective cleared. Resetting board.");
    }
  }, [baseMap, captured, guards, pickups, player, resetBoard, variant]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") movePlayer(0, -1);
      if (event.key === "ArrowDown") movePlayer(0, 1);
      if (event.key === "ArrowLeft") movePlayer(-1, 0);
      if (event.key === "ArrowRight") movePlayer(1, 0);
      if (event.key.toLowerCase() === "r") {
        resetBoard("Board reset.");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [movePlayer, resetBoard]);

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Score {score}</span>
        <span>Turns {turns}</span>
        <span>{variant === "tactics" ? `Nodes ${captured.length}` : `Goal ${baseMap.goal.x},${baseMap.goal.y}`}</span>
      </div>

      <div className="grid-board">
        {Array.from({ length: GRID_SIZE }).map((_, rowIndex) =>
          Array.from({ length: GRID_SIZE }).map((_, colIndex) => {
            const key = `${colIndex},${rowIndex}`;
            const isWall = baseMap.walls.has(key);
            const isGoal = baseMap.goal.x === colIndex && baseMap.goal.y === rowIndex;
            const isPlayer = player.x === colIndex && player.y === rowIndex;
            const isPickup = pickups.some((pickup) => pickup.x === colIndex && pickup.y === rowIndex);
            const isGuard = guards.some((guard) => guard.x === colIndex && guard.y === rowIndex);
            const isNode = baseMap.nodes.some((node) => node.x === colIndex && node.y === rowIndex);
            const isCaptured = captured.includes(key);

            return (
              <div
                className={`grid-cell ${isWall ? "grid-cell--wall" : ""} ${isGoal ? "grid-cell--goal" : ""} ${
                  isNode ? "grid-cell--node" : ""
                } ${isCaptured ? "grid-cell--captured" : ""}`}
                key={key}
              >
                {isPickup ? <span className="grid-token grid-token--pickup" /> : null}
                {isGuard ? <span className="grid-token grid-token--guard" /> : null}
                {isPlayer ? <span className="grid-token grid-token--player" /> : null}
              </div>
            );
          })
        )}
      </div>

      <div className="control-grid">
        <button className="ui-button ui-button--ghost" onClick={() => movePlayer(0, -1)} type="button">
          Up
        </button>
        <button className="ui-button ui-button--ghost" onClick={() => movePlayer(-1, 0)} type="button">
          Left
        </button>
        <button className="ui-button ui-button--ghost" onClick={() => movePlayer(1, 0)} type="button">
          Right
        </button>
        <button className="ui-button ui-button--ghost" onClick={() => movePlayer(0, 1)} type="button">
          Down
        </button>
      </div>

      <p className="game-message">{message}</p>
    </div>
  );
}

function DefenseGame() {
  const [credits, setCredits] = useState(18);
  const [lives, setLives] = useState(8);
  const [score, setScore] = useState(0);
  const [towers, setTowers] = useState([0, 0, 0, 0, 0]);
  const [enemies, setEnemies] = useState<{ id: number; lane: number; pos: number; hp: number }[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCredits((current) => current + 1);

      setEnemies((current) => {
        let updated = current.map((enemy) => ({ ...enemy, pos: enemy.pos + 0.6 }));

        updated = updated
          .map((enemy) => {
            const damage = towers[enemy.lane] * 0.8;
            return { ...enemy, hp: enemy.hp - damage };
          })
          .filter((enemy) => {
            if (enemy.hp <= 0) {
              setScore((currentScore) => currentScore + 5);
              setCredits((currentCredits) => currentCredits + 3);
              return false;
            }

            if (enemy.pos >= 9) {
              setLives((currentLives) => currentLives - 1);
              return false;
            }

            return true;
          });

        if (Math.random() > 0.45) {
          updated.push({
            id: nextId.current++,
            lane: Math.floor(Math.random() * 5),
            pos: 0,
            hp: 3 + score / 25,
          });
        }

        return updated;
      });
    }, 800);

    return () => window.clearInterval(interval);
  }, [score, towers]);

  const build = (laneIndex: number) => {
    const cost = 8 + towers[laneIndex] * 6;
    setCredits((current) => {
      if (current < cost) {
        return current;
      }

      setTowers((currentTowers) => {
        const next = [...currentTowers];
        next[laneIndex] += 1;
        return next;
      });

      return current - cost;
    });
  };

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Score {score}</span>
        <span>Credits {credits}</span>
        <span>Lives {lives}</span>
      </div>

      <div className="defense-board">
        {Array.from({ length: 5 }).map((_, laneIndex) => (
          <div className="defense-lane" key={laneIndex}>
            <span className="defense-base" />
            {towers[laneIndex] > 0 ? <span className="defense-tower">{towers[laneIndex]}</span> : null}
            {enemies
              .filter((enemy) => enemy.lane === laneIndex)
              .map((enemy) => (
                <span className="defense-enemy" key={enemy.id} style={{ left: `${enemy.pos * 10}%` }} />
              ))}
          </div>
        ))}
      </div>

      <div className="lane-controls">
        {towers.map((level, laneIndex) => (
          <button className="ui-button ui-button--ghost" key={laneIndex} onClick={() => build(laneIndex)} type="button">
            Lane {laneIndex + 1} {level > 0 ? `Lv ${level}` : "Build"}
          </button>
        ))}
      </div>
    </div>
  );
}

function SnakeGame({ slug }: { slug: string }) {
  const seed = useMemo(() => seedFromSlug(slug), [slug]);
  const random = useMemo(() => createSeededRandom(seed), [seed]);
  const [snake, setSnake] = useState<GridPoint[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ]);
  const [direction, setDirection] = useState<GridPoint>({ x: 1, y: 0 });
  const [food, setFood] = useState<GridPoint>({ x: 8, y: 6 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") setDirection({ x: 0, y: -1 });
      if (event.key === "ArrowDown") setDirection({ x: 0, y: 1 });
      if (event.key === "ArrowLeft") setDirection({ x: -1, y: 0 });
      if (event.key === "ArrowRight") setDirection({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const interval = window.setInterval(() => {
      setSnake((current) => {
        const head = current[0];
        const nextHead = { x: head.x + direction.x, y: head.y + direction.y };

        if (
          nextHead.x < 0 ||
          nextHead.y < 0 ||
          nextHead.x >= 12 ||
          nextHead.y >= 12 ||
          current.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y)
        ) {
          setGameOver(true);
          return current;
        }

        const grown = [nextHead, ...current];
        if (nextHead.x === food.x && nextHead.y === food.y) {
          setScore((currentScore) => currentScore + 10);
          setFood({
            x: Math.floor(random() * 12),
            y: Math.floor(random() * 12),
          });
          return grown;
        }

        grown.pop();
        return grown;
      });
    }, 160);

    return () => window.clearInterval(interval);
  }, [direction, food.x, food.y, gameOver, random]);

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Score {score}</span>
        <span>Length {snake.length}</span>
      </div>

      <div className="snake-board">
        {Array.from({ length: 12 }).map((_, rowIndex) =>
          Array.from({ length: 12 }).map((_, colIndex) => {
            const hasSnake = snake.some((segment) => segment.x === colIndex && segment.y === rowIndex);
            const isFood = food.x === colIndex && food.y === rowIndex;

            return <div className={`snake-cell ${hasSnake ? "snake-cell--body" : ""} ${isFood ? "snake-cell--food" : ""}`} key={`${rowIndex}-${colIndex}`} />;
          })
        )}
      </div>

      {gameOver ? <p className="game-message">Snake crashed. Refresh the page or press R to run it back.</p> : null}
    </div>
  );
}

function PaddleGame() {
  const [playerY, setPlayerY] = useState(40);
  const [botY, setBotY] = useState(40);
  const [ball, setBall] = useState({ x: 50, y: 50, vx: 1.2, vy: 1.1 });
  const [score, setScore] = useState({ player: 0, bot: 0 });

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        setPlayerY((current) => clamp(current - 6, 0, 80));
      }
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        setPlayerY((current) => clamp(current + 6, 0, 80));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBall((currentBall) => {
        const next = { ...currentBall, x: currentBall.x + currentBall.vx, y: currentBall.y + currentBall.vy };

        if (next.y <= 2 || next.y >= 98) {
          next.vy *= -1;
        }

        if (next.x <= 8 && next.y >= playerY && next.y <= playerY + 18) {
          next.vx = Math.abs(next.vx);
        }

        if (next.x >= 92 && next.y >= botY && next.y <= botY + 18) {
          next.vx = -Math.abs(next.vx);
        }

        if (next.x < 0) {
          setScore((currentScore) => ({ ...currentScore, bot: currentScore.bot + 1 }));
          return { x: 50, y: 50, vx: 1.2, vy: 1.1 };
        }

        if (next.x > 100) {
          setScore((currentScore) => ({ ...currentScore, player: currentScore.player + 1 }));
          return { x: 50, y: 50, vx: -1.2, vy: -1.1 };
        }

        setBotY((currentBotY) => clamp(currentBotY + Math.sign(next.y - (currentBotY + 9)) * 3, 0, 80));
        return next;
      });
    }, 32);

    return () => window.clearInterval(interval);
  }, [botY, playerY]);

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>You {score.player}</span>
        <span>Bot {score.bot}</span>
      </div>

      <div className="paddle-board">
        <span className="paddle-stick" style={{ top: `${playerY}%`, left: "4%" }} />
        <span className="paddle-stick" style={{ top: `${botY}%`, right: "4%" }} />
        <span className="paddle-ball" style={{ left: `${ball.x}%`, top: `${ball.y}%` }} />
      </div>
    </div>
  );
}

function findCluster(board: string[][], x: number, y: number) {
  const color = board[y]?.[x];
  if (!color) {
    return [] as GridPoint[];
  }

  const stack = [{ x, y }];
  const seen = new Set<string>();
  const cluster: GridPoint[] = [];

  while (stack.length) {
    const point = stack.pop()!;
    const key = `${point.x},${point.y}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    if (board[point.y]?.[point.x] !== color) {
      continue;
    }

    cluster.push(point);
    stack.push({ x: point.x + 1, y: point.y });
    stack.push({ x: point.x - 1, y: point.y });
    stack.push({ x: point.x, y: point.y + 1 });
    stack.push({ x: point.x, y: point.y - 1 });
  }

  return cluster;
}

function makeClusterBoard(tokens: string[], seed: number) {
  const random = createSeededRandom(seed);
  return Array.from({ length: 6 }).map(() => Array.from({ length: 6 }).map(() => pick(tokens, random)));
}

function ClusterGame({ slug }: { slug: string }) {
  const tokens = useMemo(() => getClusterTokens(slug), [slug]);
  const seed = useMemo(() => seedFromSlug(slug), [slug]);
  const [board, setBoard] = useState(() => makeClusterBoard(tokens, seed));
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(18);

  const clickCell = (x: number, y: number) => {
    const cluster = findCluster(board, x, y);
    if (cluster.length < 2 || moves <= 0) {
      return;
    }

    const next = board.map((row) => [...row]);
    for (const point of cluster) {
      next[point.y][point.x] = "";
    }

    for (let col = 0; col < 6; col += 1) {
      const remaining = [];
      for (let row = 5; row >= 0; row -= 1) {
        if (next[row][col]) {
          remaining.push(next[row][col]);
        }
      }

      for (let row = 5; row >= 0; row -= 1) {
        next[row][col] = remaining[5 - row] ?? tokens[(row + col + cluster.length) % tokens.length];
      }
    }

    setBoard(next);
    setScore((current) => current + cluster.length * cluster.length);
    setMoves((current) => current - 1);
  };

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Score {score}</span>
        <span>Moves {moves}</span>
      </div>

      <div className="cluster-board">
        {board.map((row, y) =>
          row.map((token, x) => (
            <button className="cluster-cell" key={`${x}-${y}`} onClick={() => clickCell(x, y)} type="button">
              {token}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function ColorSortGame() {
  const [tubes, setTubes] = useState<string[][]>([
    ["C", "L", "V", "C"],
    ["L", "V", "C", "L"],
    ["V", "C", "L", "V"],
    [],
  ]);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);

  const pour = (from: number, to: number) => {
    if (from === to) {
      setSelected(null);
      return;
    }

    setTubes((current) => {
      const source = [...current[from]];
      const target = [...current[to]];
      const top = source[source.length - 1];

      if (!top || target.length >= 4 || (target.length > 0 && target[target.length - 1] !== top)) {
        return current;
      }

      source.pop();
      target.push(top);

      const next = current.map((tube, index) => {
        if (index === from) return source;
        if (index === to) return target;
        return tube;
      });

      setMoves((currentMoves) => currentMoves + 1);
      return next;
    });

    setSelected(null);
  };

  const solved = tubes.every((tube) => tube.length === 0 || (tube.length === 4 && tube.every((ball) => ball === tube[0])));

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Moves {moves}</span>
        <span>{solved ? "Solved" : "Sorting"}</span>
      </div>

      <div className="tube-row">
        {tubes.map((tube, index) => (
          <button
            className={`tube ${selected === index ? "tube--selected" : ""}`}
            key={index}
            onClick={() => (selected === null ? setSelected(index) : pour(selected, index))}
            type="button"
          >
            {Array.from({ length: 4 }).map((_, slotIndex) => {
              const token = tube[3 - slotIndex] ?? "";
              return <span className={`tube-ball ${token ? `tube-ball--${token}` : ""}`} key={slotIndex} />;
            })}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReactionGame() {
  const [stage, setStage] = useState<"idle" | "waiting" | "live" | "result">("idle");
  const [reaction, setReaction] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);

  const start = () => {
    setStage("waiting");
    setReaction(null);
    const delay = 900 + Math.random() * 1800;

    window.setTimeout(() => {
      setStage("live");
      const liveAt = performance.now();
      const clickHandler = () => {
        const result = Math.round(performance.now() - liveAt);
        setReaction(result);
        setBest((current) => (current === null ? result : Math.min(current, result)));
        setStage("result");
        window.removeEventListener("click", clickHandler);
      };

      window.addEventListener("click", clickHandler, { once: true });
    }, delay);
  };

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Best {best ?? "--"} ms</span>
        <span>Last {reaction ?? "--"} ms</span>
      </div>

      <button className={`reaction-pad reaction-pad--${stage}`} onClick={stage === "idle" || stage === "result" ? start : undefined} type="button">
        {stage === "idle" && "Start round"}
        {stage === "waiting" && "Wait for it..."}
        {stage === "live" && "CLICK"}
        {stage === "result" && `Again (${reaction} ms)`}
      </button>
    </div>
  );
}

function LabChallengeGame({ slug }: { slug: string }) {
  const pool = useMemo(() => getLabPromptPool(slug), [slug]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Solve the next prompt.");
  const [flashSequence, setFlashSequence] = useState<number[]>([0, 1, 2]);
  const [memoryPick, setMemoryPick] = useState<number[]>([]);

  const current = pool.length > 0 ? pool[index % pool.length] : null;

  if (slug === "pattern-memory-game") {
    const palette = ["C", "L", "V", "O"];

    return (
      <div className="lab-game-shell">
        <div className="game-hud">
          <span>Level {flashSequence.length}</span>
          <span>Score {score}</span>
        </div>

        <div className="memory-grid">
          {palette.map((token, tokenIndex) => (
            <button
              className={`memory-pad ${memoryPick[memoryPick.length - 1] === tokenIndex ? "memory-pad--active" : ""}`}
              key={token}
              onClick={() => {
                const next = [...memoryPick, tokenIndex];
                setMemoryPick(next);

                if (tokenIndex !== flashSequence[next.length - 1]) {
                  setMessage("Wrong sequence. Round reset.");
                  setMemoryPick([]);
                  setFlashSequence([0, 1, 2]);
                  setScore(0);
                  return;
                }

                if (next.length === flashSequence.length) {
                  setScore((currentScore) => currentScore + flashSequence.length * 5);
                  setMemoryPick([]);
                  setFlashSequence((currentSequence) => [...currentSequence, Math.floor(Math.random() * 4)]);
                  setMessage("Correct. Sequence got longer.");
                }
              }}
              type="button"
            >
              {token}
            </button>
          ))}
        </div>

        <p className="game-message">
          Sequence: {flashSequence.map((step) => palette[step]).join(" ")}. Repeat it in order.
        </p>
      </div>
    );
  }

  if (slug === "typing-racer") {
    const prompt = typeof current === "string" ? current : "";

    return (
      <div className="lab-game-shell">
        <div className="game-hud">
          <span>Score {score}</span>
          <span>Prompt {index + 1}</span>
        </div>
        <div className="challenge-block">
          <strong>{prompt}</strong>
          <input className="ui-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type the prompt exactly" />
          <button
            className="ui-button"
            onClick={() => {
              if (input.trim() === prompt) {
                setScore((currentScore) => currentScore + 15);
                setIndex((currentIndex) => currentIndex + 1);
                setInput("");
                setMessage("Clean typing round.");
              } else {
                setMessage("Close. Fix the line and try again.");
              }
            }}
            type="button"
          >
            Submit
          </button>
        </div>
        <p className="game-message">{message}</p>
      </div>
    );
  }

  if (slug === "word-ladder-game") {
    const ladders = [
      { start: "COLD", goal: "WARM", options: ["CORD", "GOLD", "BOLD", "CARD"], answer: "CORD" },
      { start: "FISH", goal: "SOUP", options: ["DASH", "DISH", "RUSH", "MASH"], answer: "DISH" },
    ];
    const ladder = ladders[index % ladders.length];

    return (
      <div className="lab-game-shell">
        <div className="game-hud">
          <span>Score {score}</span>
          <span>{ladder.start} → {ladder.goal}</span>
        </div>
        <div className="option-grid">
          {ladder.options.map((option) => (
            <button
              className="option-card"
              key={option}
              onClick={() => {
                if (option === ladder.answer) {
                  setScore((currentScore) => currentScore + 20);
                  setIndex((currentIndex) => currentIndex + 1);
                  setMessage("Correct rung.");
                } else {
                  setMessage("That word breaks the ladder.");
                }
              }}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
        <p className="game-message">Choose the best next word after {ladder.start}.</p>
      </div>
    );
  }

  if (!current || typeof current === "string") {
    return (
      <div className="lab-game-shell">
        <p className="game-message">This lab build is warming up.</p>
      </div>
    );
  }

  return (
    <div className="lab-game-shell">
      <div className="game-hud">
        <span>Score {score}</span>
        <span>Round {index + 1}</span>
      </div>

      <div className="challenge-block">
        <strong>{current.question}</strong>
        <div className="option-grid">
          {current.options.map((option) => (
            <button
              className="option-card"
              key={option}
              onClick={() => {
                if (option === current.answer) {
                  setScore((currentScore) => currentScore + 15);
                  setIndex((currentIndex) => currentIndex + 1);
                  setMessage("Correct answer.");
                } else {
                  setMessage("Not quite. Try the next clue.");
                }
              }}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="game-message">{message}</p>
    </div>
  );
}

function renderGame(game: Game, config: PlayableGameConfig) {
  switch (config.engine) {
    case "action":
      return <ActionGame slug={game.slug} variant={config.variant} />;
    case "trajectory":
      return <TrajectoryGame slug={game.slug} />;
    case "economy":
      return <EconomyGame slug={game.slug} />;
    case "grid":
      return <GridGame slug={game.slug} variant={config.variant} />;
    case "defense":
      return <DefenseGame />;
    case "snake":
      return <SnakeGame slug={game.slug} />;
    case "paddle":
      return <PaddleGame />;
    case "cluster":
      return <ClusterGame slug={game.slug} />;
    case "color-sort":
      return <ColorSortGame />;
    case "reaction":
      return <ReactionGame />;
    case "lab":
      return <LabChallengeGame slug={game.slug} />;
    default:
      return null;
  }
}

export default function PlayableGameLab({
  game,
  config,
}: {
  game: Game;
  config: PlayableGameConfig;
}) {
  return (
    <section className="game-layout">
      <div className="game-frame game-frame--playable">
        <div className="game-frame-top">
          <span className="poster-chip">MathShield Original</span>
          <span className="frame-status">Playable now</span>
        </div>

        <div className="generated-game-wrap">{renderGame(game, config)}</div>
      </div>

      <aside className="note-card">
        <p className="section-kicker">{game.category === "math" ? "Math Lab Build" : "Arcade Build"}</p>
        <h2>How it plays</h2>
        <p>{config.objective}</p>

        <div className="tag-row">
          {config.controls.map((control) => (
            <span className="tag" key={control}>
              {control}
            </span>
          ))}
        </div>

        <p className="challenge-copy">{config.tip}</p>
        <GameProgressCard slug={game.slug} />
      </aside>
    </section>
  );
}
