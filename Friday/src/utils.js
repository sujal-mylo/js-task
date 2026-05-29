export function debounce(callback, delay = 300) {
  let timeoutId = null;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return "Yesterday";
  } else if (date.getFullYear() === today.getFullYear()) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }
}

export function parseTags(tagString) {
  return tagString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag);
}
