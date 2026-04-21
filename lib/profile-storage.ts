export type GameProgress = {
  playSeconds: number;
  lastPlayedAt: string | null;
};

export type StoredUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  xp: number;
  xpCarrySeconds: number;
  createdAt: string;
  progress: Record<string, GameProgress>;
};

const USERS_KEY = "mathshield-users";
const SESSION_KEY = "mathshield-session";
const CHANGE_EVENT = "mathshield-profile-change";
const XP_SECONDS_PER_POINT = 6;
const XP_PER_LEVEL = 100;

function canUseStorage() {
  return typeof window !== "undefined";
}

function emitChange() {
  if (canUseStorage()) {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

function readUsers() {
  if (!canUseStorage()) {
    return [] as StoredUser[];
  }

  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) {
    return [] as StoredUser[];
  }

  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [] as StoredUser[];
  }
}

function writeUsers(users: StoredUser[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSessionEmail() {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(SESSION_KEY);
}

function setSessionEmail(email: string | null) {
  if (!canUseStorage()) {
    return;
  }

  if (email) {
    window.localStorage.setItem(SESSION_KEY, email);
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `user-${Date.now()}`;
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export function subscribeToProfileChanges(callback: () => void) {
  if (!canUseStorage()) {
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function getCurrentUser() {
  const email = getSessionEmail();
  if (!email) {
    return null;
  }

  return readUsers().find((user) => user.email === email) ?? null;
}

export function signUpUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const cleanName = username.trim();
  const normalizedName = normalizeUsername(username);
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanName || !cleanEmail || !cleanPassword) {
    return { ok: false as const, error: "Fill out every field first." };
  }

  const users = readUsers();
  if (users.some((user) => user.email === cleanEmail)) {
    return { ok: false as const, error: "That email is already being used." };
  }
  if (users.some((user) => normalizeUsername(user.username) === normalizedName)) {
    return { ok: false as const, error: "That username is already taken." };
  }

  const user: StoredUser = {
    id: makeId(),
    username: cleanName,
    email: cleanEmail,
    password: cleanPassword,
    avatarUrl: "/default-avatar.svg",
    xp: 0,
    xpCarrySeconds: 0,
    createdAt: new Date().toISOString(),
    progress: {},
  };

  writeUsers([...users, user]);
  setSessionEmail(cleanEmail);
  emitChange();

  return { ok: true as const, user };
}

export function loginUser({
  email,
  identifier,
  password,
}: {
  email?: string;
  identifier?: string;
  password: string;
}) {
  const cleanIdentifier = (identifier ?? email ?? "").trim().toLowerCase();
  const cleanPassword = password.trim();
  const user = readUsers().find(
    (entry) =>
      (entry.email === cleanIdentifier || normalizeUsername(entry.username) === cleanIdentifier) &&
      entry.password === cleanPassword
  );

  if (!user) {
    return { ok: false as const, error: "That username/email and password do not match a saved account." };
  }

  setSessionEmail(user.email);
  emitChange();

  return { ok: true as const, user };
}

export function logoutUser() {
  setSessionEmail(null);
  emitChange();
}

export function getGameProgress(user: StoredUser | null, slug: string): GameProgress {
  if (!user) {
    return {
      playSeconds: 0,
      lastPlayedAt: null,
    };
  }

  return (
    user.progress[slug] ?? {
      playSeconds: 0,
      lastPlayedAt: null,
    }
  );
}

export function recordGameplay(slug: string, seconds: number) {
  if (seconds <= 0) {
    return null;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const users = readUsers();
  const userIndex = users.findIndex((user) => user.id === currentUser.id);
  if (userIndex === -1) {
    return null;
  }

  const nextUser = { ...users[userIndex] };
  const previousProgress = getGameProgress(nextUser, slug);
  const totalCarrySeconds = nextUser.xpCarrySeconds + seconds;
  const gainedXp = Math.floor(totalCarrySeconds / XP_SECONDS_PER_POINT);

  nextUser.xp += gainedXp;
  nextUser.xpCarrySeconds = totalCarrySeconds % XP_SECONDS_PER_POINT;
  nextUser.progress = {
    ...nextUser.progress,
    [slug]: {
      playSeconds: previousProgress.playSeconds + seconds,
      lastPlayedAt: new Date().toISOString(),
    },
  };

  users[userIndex] = nextUser;
  writeUsers(users);
  emitChange();

  return {
    user: nextUser,
    progress: nextUser.progress[slug],
    gainedXp,
  };
}

export function getLevelFromXp(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getLevelMeta(xp: number) {
  const level = getLevelFromXp(xp);
  const levelStart = (level - 1) * XP_PER_LEVEL;
  const currentXp = xp - levelStart;

  return {
    level,
    currentXp,
    neededXp: XP_PER_LEVEL,
    progressPercent: Math.min(100, (currentXp / XP_PER_LEVEL) * 100),
  };
}
