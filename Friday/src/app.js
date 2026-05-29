import {
  getAllNotes,
  addNote,
  deleteNote,
  getAllTags,
  getFilteredNotes,
  loadNotesFromStorage,
} from "./data.js";
import { renderNotes, renderTagChips, bindEvents, clearForm } from "./ui.js";
import { debounce, parseTags } from "./utils.js";

const appState = {
  selectedTag: null,
  searchQuery: "",
};

function init() {
  loadNotesFromStorage();
  updateDisplay();

  bindEvents(
    handleFormSubmit,
    handleSearchInput,
    handleClearFilters,
    handleDeleteNote
  );
}

function updateDisplay() {
  const filteredNotes = getFilteredNotes(appState.searchQuery, appState.selectedTag);
  const allTags = getAllTags();

  renderNotes(filteredNotes, handleTagClick);
  renderTagChips(allTags, appState.selectedTag, handleTagSelect);
}

function handleFormSubmit(formData) {
  const { title, body, tagsInput } = formData;

  if (!title.trim() || !body.trim()) {
    alert("Please fill in both title and body");
    return;
  }

  const tags = parseTags(tagsInput);
  addNote(title, body, tags);

  clearForm();
  updateDisplay();
}

const handleSearchInput = debounce((query) => {
  appState.searchQuery = query;
  updateDisplay();
}, 300);

function handleTagSelect(tag) {
  appState.selectedTag = tag;
  updateDisplay();
}

function handleTagClick(tag) {
  appState.selectedTag = tag;
  updateDisplay();
}

function handleClearFilters() {
  appState.selectedTag = null;
  appState.searchQuery = "";
  document.getElementById("searchInput").value = "";
  updateDisplay();
}

function handleDeleteNote(noteId) {
  deleteNote(noteId);
  updateDisplay();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
