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

function generateNavigation() {
    // Create the main <nav> and <ul> elements
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    // Loop through each navigation item and create the necessary HTML
    navItems.forEach(item => {
        const li = document.createElement('li');

        if (item.dropdown) {
            // Create the dropdown structure
            const div = document.createElement('div');
            div.className = 'dropdown';
            const button = document.createElement('button');
            button.className = 'dropdown-trigger';
            button.textContent = item.title;

            const dropdownUl = document.createElement('ul');
            dropdownUl.className = 'dropdown-content';

            // Loop through the dropdown links and create <li> elements
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
            li.appendChild(div);
        } else {
            // Create a simple button if there is no dropdown
            const button = document.createElement('button');
            button.className = 'nav-button';
            button.textContent = item.title;
            li.appendChild(button);
        }

        // Append the <li> element to the main <ul>
        ul.appendChild(li);
    });

    // Append the <ul> to the <nav> element
    nav.appendChild(ul);

    // Append the <nav> to the document body or another specific element
    document.body.appendChild(nav);
}

// Call the function to generate and append the navigation
generateNavigation();







let dropdownTriggers = document.querySelectorAll('.dropdown-trigger');




dropdownTriggers.forEach(trigger => {
    let dropdownTimerOpen;
    let dropdownTimerClose;

    const dropdownContent = trigger.nextElementSibling;

    // Open dropdown after 1s hover
    trigger.addEventListener('mouseover', function() {
        dropdownTimerOpen = setTimeout(function() {
            dropdownContent.style.display = 'block';
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
        }, 500);
    });

    // Handle mouse leaving the dropdown or its content
    function handleMouseOut() {
        clearTimeout(dropdownTimerOpen);

        dropdownTimerClose = setTimeout(function() {
            dropdownContent.style.display = 'none';
            dropdownContent.style.opacity = '0';
            dropdownContent.style.visibility = 'hidden';
        }, 500);
    }

    // Handle mouse entering the dropdown or its content
    function handleMouseIn() {
        clearTimeout(dropdownTimerClose);
    }

    trigger.addEventListener('mouseout', handleMouseOut);
    dropdownContent.addEventListener('mouseover', handleMouseIn);
    dropdownContent.addEventListener('mouseout', handleMouseOut);

    // Click functionality
    trigger.addEventListener('click', function() {
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
            dropdownContent.style.opacity = '0';
            dropdownContent.style.visibility = 'hidden';
        } else {
            dropdownContent.style.display = 'block';
            dropdownContent.style.opacity = '1';
            dropdownContent.style.visibility = 'visible';
        }
    });

    // Close dropdown if clicked anywhere outside
    window.addEventListener('click', function(event) {
        if (!trigger.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none';
            dropdownContent.style.opacity = '0';
            dropdownContent.style.visibility = 'hidden';
        }
    });
});
