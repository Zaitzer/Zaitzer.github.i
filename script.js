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
