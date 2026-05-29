const input = document.querySelector("#q");
const status = document.querySelector("#status");
const results = document.querySelector("#results");

let controller;

const search = async (query) => {

    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    if (!query.trim()) {
        results.replaceChildren();
        status.textContent = "";
        return;
    }

    status.textContent = "Loading...";

    try {

        const res = await fetch(
            `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`,
            {
                signal: controller.signal
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const { items } = await res.json();

        results.replaceChildren(
            ...items.map((user) => {

                const li = document.createElement("li");

                const img = document.createElement("img");

                img.src = user.avatar_url;
                img.width = 32;

                li.append(
                    img,
                    document.createTextNode(" " + user.login)
                );

                return li;
            })
        );

        status.textContent =
            items.length
                ? `${items.length} results`
                : "No results";

    } catch (err) {

        if (err.name !== "AbortError") {
            status.textContent =
                "Error: " + err.message;
        }
    }
};

function debounce(fn, delay) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);

    };
}

const debouncedSearch = debounce(search, 500);

input.addEventListener("input", (e) => {
    debouncedSearch(e.target.value);
});