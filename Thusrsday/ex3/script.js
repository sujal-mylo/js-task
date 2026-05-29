const list = document.getElementById("memberList");

const members =
    JSON.parse(localStorage.getItem("members")) || [];

function renderMember(member) {

    const li = document.createElement("li");

    li.dataset.id = member.id;

    li.textContent =
        `${member.name} — ${member.role} `;

    const deleteBtn =
        document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {

        const index = members.findIndex(
            m => m.id == member.id
        );

        if (index !== -1) {
            members.splice(index, 1);
        }

        localStorage.setItem(
            "members",
            JSON.stringify(members)
        );

        li.remove();
    });

    li.append(deleteBtn);

    list.append(li);
}

members.forEach(member => {
    renderMember(member);
});

document
    .querySelector("#add-member")
    .addEventListener("submit", (e) => {

        e.preventDefault();

        const data = Object.fromEntries(
            new FormData(e.target)
        );

        const newMember = {
            id: Date.now(),
            active: true,
            ...data
        };

        members.push(newMember);

        localStorage.setItem(
            "members",
            JSON.stringify(members)
        );

        renderMember(newMember);

        e.target.reset();
    });