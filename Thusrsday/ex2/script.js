const list = document.getElementById("memberList");

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li || !list.contains(li)) return;
    li.classList.toggle("selected");
    console.log("Toggled member:", li.dataset.id);
});