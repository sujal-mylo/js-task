import { formatDate } from "./utils.js";
import { deleteNote, getAllTags } from "./data.js";

function createNoteElement(note) {
  const noteCard = document.createElement("div");
  noteCard.className = "note-card";
  noteCard.dataset.noteId = note.id;

  const header = document.createElement("div");
  header.className = "note-header";

  const titleEl = document.createElement("h3");
  titleEl.className = "note-title";
  titleEl.textContent = note.title;

  const dateEl = document.createElement("span");
  dateEl.className = "note-date";
  dateEl.textContent = formatDate(note.createdAt);

  header.appendChild(titleEl);
  header.appendChild(dateEl);

  const bodyEl = document.createElement("p");
  bodyEl.className = "note-body";
  bodyEl.textContent = note.body;

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "note-tags";

  note.tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.className = "note-tag";
    tagEl.textContent = tag;
    tagEl.dataset.tag = tag;
    tagsContainer.appendChild(tagEl);
  });

  const footer = document.createElement("div");
  footer.className = "note-footer";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.noteId = note.id;

  footer.appendChild(deleteBtn);

  noteCard.appendChild(header);
  noteCard.appendChild(bodyEl);
  noteCard.appendChild(tagsContainer);
  noteCard.appendChild(footer);

  return noteCard;
}

export function renderNotes(notesToRender, onTagClick) {
  const notesList = document.getElementById("notesList");
  const noteCount = document.getElementById("noteCount");

  notesList.innerHTML = "";

  if (notesToRender.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <div class="empty-state-icon">📭</div>
      <p>No notes found. Create one to get started!</p>
    `;
    notesList.appendChild(emptyState);
  } else {
    notesToRender.forEach((note) => {
      const noteEl = createNoteElement(note);
      notesList.appendChild(noteEl);

      const tagElements = noteEl.querySelectorAll(".note-tag");
      tagElements.forEach((tagEl) => {
        tagEl.addEventListener("click", () => {
          onTagClick(tagEl.dataset.tag);
        });
      });
    });
  }

  noteCount.textContent = `(${notesToRender.length})`;
}

export function renderTagChips(tags, activeTag, onTagSelect) {
  const tagChips = document.getElementById("tagChips");
  tagChips.innerHTML = "";

  tags.forEach((tag) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "tag-chip";
    if (tag === activeTag) {
      chip.classList.add("active");
    }
    chip.textContent = tag;
    chip.dataset.tag = tag;

    chip.addEventListener("click", (e) => {
      e.preventDefault();
      onTagSelect(tag === activeTag ? null : tag);
    });

    tagChips.appendChild(chip);
  });
}

export function bindEvents(onFormSubmit, onSearchInput, onClearFilters, onNoteDelete) {
  const noteForm = document.getElementById("noteForm");
  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("noteTitle").value;
    const body = document.getElementById("noteBody").value;
    const tagsInput = document.getElementById("noteTags").value;

    onFormSubmit({ title, body, tagsInput });

    noteForm.reset();
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    onSearchInput(e.target.value);
  });

  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  clearFiltersBtn.addEventListener("click", onClearFilters);

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
      const noteId = parseInt(e.target.dataset.noteId, 10);
      if (confirm("Are you sure you want to delete this note?")) {
        onNoteDelete(noteId);
      }
    }
  });
}

export function getFormValues() {
  return {
    title: document.getElementById("noteTitle").value,
    body: document.getElementById("noteBody").value,
    tagsInput: document.getElementById("noteTags").value,
  };
}

export function clearForm() {
  document.getElementById("noteForm").reset();
}
