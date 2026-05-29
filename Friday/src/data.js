export const seedNotes = [
  {
    id: 1,
    title: "Standup notes",
    body: "Discussed sprint goals.",
    tags: ["work", "meeting"],
    createdAt: "2026-05-20T10:00:00Z",
  },
  {
    id: 2,
    title: "Grocery list",
    body: "Milk, eggs, bread, fruit.",
    tags: ["personal"],
    createdAt: "2026-05-21T08:30:00Z",
  },
  {
    id: 3,
    title: "Reading list",
    body: "Finish You Don't Know JS.",
    tags: ["learning"],
    createdAt: "2026-05-22T19:15:00Z",
  },
  {
    id: 4,
    title: "Bug to fix",
    body: "Search input doesn't debounce.",
    tags: ["work", "bug"],
    createdAt: "2026-05-23T14:45:00Z",
  },
];

let notes = [...seedNotes];
let nextId = Math.max(...notes.map((n) => n.id)) + 1;

export function addNote(title, body, tags = []) {
  const newNote = {
    id: nextId++,
    title: title.trim(),
    body: body.trim(),
    tags: tags.map((t) => t.trim()).filter((t) => t),
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  return newNote;
}

export function deleteNote(id) {
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    return true;
  }
  return false;
}

export function getAllNotes() {
  return notes;
}

export function filterByTag(tag) {
  return notes.filter((note) => note.tags.includes(tag));
}

export function searchNotes(query) {
  const lowerQuery = query.toLowerCase();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(lowerQuery) ||
      note.body.toLowerCase().includes(lowerQuery)
  );
}

export function getAllTags() {
  const tagSet = new Set();
  notes.forEach((note) => {
    note.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getFilteredNotes(searchQuery, selectedTag) {
  let result = notes;

  if (selectedTag) {
    result = result.filter((note) => note.tags.includes(selectedTag));
  }

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    result = result.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.body.toLowerCase().includes(lowerQuery)
    );
  }

  return result;
}
