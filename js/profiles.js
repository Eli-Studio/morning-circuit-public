// ============================================================
// profiles.js — active-profile compatibility helpers
// ============================================================

export const PROFILE_IDS = ['userA', 'userB'];

// Older saves predate activeProfileIds and therefore represent the original
// two-profile experience. Invalid or empty values also fall back safely.
export function getActiveProfileIds(settings = {}) {
  if (!Array.isArray(settings.activeProfileIds)) return [...PROFILE_IDS];
  // userA is the primary profile and cannot be disabled in the current UI.
  // Normalizing imported or manually edited state to that same invariant keeps
  // the home, Settings, and cycle progression views aligned.
  return settings.activeProfileIds.includes('userB') ? [...PROFILE_IDS] : ['userA'];
}

export function setSecondProfileActive(settings, active) {
  const ids = new Set(getActiveProfileIds(settings));
  ids.add('userA');
  if (active) ids.add('userB');
  else ids.delete('userB');
  settings.activeProfileIds = PROFILE_IDS.filter(id => ids.has(id));
  return settings.activeProfileIds;
}
