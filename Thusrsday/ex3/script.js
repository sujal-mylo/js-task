const list = document.getElementById("memberList");

const members = [];

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
        const li = document.createElement("li");
        li.textContent =
            `${newMember.name} — ${newMember.role}`;
        li.dataset.id = newMember.id;
        list.append(li);

        console.log("Members Array:");
        console.log(members);

        e.target.reset();
    });