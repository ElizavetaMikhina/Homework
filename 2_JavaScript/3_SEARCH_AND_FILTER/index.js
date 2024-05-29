document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const itemList = document.querySelector(".user-list__items");

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                li.classList.add('user-list__item');
                itemList.appendChild(li);
            });
        })
        .catch(error => console.error('Ошибка получения данных:', error));

    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const items = itemList.querySelectorAll(".user-list__item");

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filter)) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});