// Define the navigation structure as an array of objects
const navItems = [
    {
        title: "Mathematics",
        dropdown: true,
        links: [
            { title: "Mathematics", url: "Math/Math.html" },
            { title: "Equivelance of tangent space", url: "Math/tangentSpace.html" },
            { title: "Fuzzy sets", url: "Math/fuzzy.html" }
        ]
    },
    {
        title: "Games",
        dropdown: true,
        links: [
            { title: "Games", url: "Games/games.html" },
            { title: "Pong", url: "Games/PongBuild/index.html" },
            { title: "Motemikser", url: "Games/motemikser.html" }
        ]
    },
    {
        title: "About Me",
        dropdown: false
    }
];

// Class to handle navigation generation and dropdown functionality
class Navigation {
    constructor(navItems) {
        this.navItems = navItems;
    }

    // Generate the navigation menu
    generateNavigation() {
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');

        this.navItems.forEach(item => {
            const li = document.createElement('li');

            if (item.dropdown) {
                const dropdown = this.createDropdown(item);
                li.appendChild(dropdown);
            } else {
                const button = this.createButton(item.title);
                li.appendChild(button);
            }

            ul.appendChild(li);
        });

        nav.appendChild(ul);
        document.body.appendChild(nav);
    }

    // Create a dropdown menu for a navigation item
    createDropdown(item) {
        const div = document.createElement('div');
        div.className = 'dropdown';
        const button = this.createButton(item.title, 'dropdown-trigger');

        const dropdownUl = document.createElement('ul');
        dropdownUl.className = 'dropdown-content';

        item.links.forEach(link => {
            const linkLi = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.title;
            linkLi.appendChild(a);
            dropdownUl.appendChild(linkLi);
        });

        div.appendChild(button);
        div.appendChild(dropdownUl);
        return div;
    }

    // Create a button for a navigation item
    createButton(title, className = 'nav-button') {
        const button = document.createElement('button');
        button.className = className;
        button.textContent = title;
        return button;
    }

    // Setup event listeners for dropdown functionality
    setupDropdowns() {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

        dropdownTriggers.forEach(trigger => {
            const dropdownContent = trigger.nextElementSibling;
            this.setupDropdownEvents(trigger, dropdownContent);
        });
    }

    // Setup event listeners for a specific dropdown
    setupDropdownEvents(trigger, dropdownContent) {
        let dropdownTimerOpen, dropdownTimerClose;

        const manageDropdownTimer = (action, callback, delay) => {
            if (action === 'set') {
                return setTimeout(callback, delay);
            } else if (action === 'clear') {
                clearTimeout(callback);
            }
        };

        const toggleDropdownVisibility = (forceShow = null) => {
            const isVisible = dropdownContent.style.display === 'block';
            const shouldShow = forceShow !== null ? forceShow : !isVisible;

            dropdownContent.style.display = shouldShow ? 'block' : 'none';
            dropdownContent.style.opacity = shouldShow ? '1' : '0';
            dropdownContent.style.visibility = shouldShow ? 'visible' : 'hidden';
        };

        trigger.addEventListener('mouseover', () => {
            dropdownTimerOpen = manageDropdownTimer('set', () => toggleDropdownVisibility(true), 500);
        });

        trigger.addEventListener('mouseout', () => {
            manageDropdownTimer('clear', dropdownTimerOpen);
            dropdownTimerClose = manageDropdownTimer('set', () => toggleDropdownVisibility(false), 500);
        });

        dropdownContent.addEventListener('mouseover', () => {
            manageDropdownTimer('clear', dropdownTimerClose);
        });

        dropdownContent.addEventListener('mouseout', () => {
            dropdownTimerClose = manageDropdownTimer('set', () => toggleDropdownVisibility(false), 500);
        });

        trigger.addEventListener('click', () => {
            toggleDropdownVisibility();
        });

        window.addEventListener('click', (event) => {
            if (!trigger.contains(event.target) && !dropdownContent.contains(event.target)) {
                toggleDropdownVisibility(false);
            }
        });
    }
}

// Initialize and setup navigation
const navigation = new Navigation(navItems);
navigation.generateNavigation();
navigation.setupDropdowns();

