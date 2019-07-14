export function valueList(items) {
    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Value: ${item}`;
        ul.appendChild(li);
    });
    return ul;
}
