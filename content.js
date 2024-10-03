function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function scroll() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeInOut = progress < 0.5 
            ? 2 * progress * progress 
            : -1 + (4 - 2 * progress) * progress;
        window.scrollTo(0, startY + distance * easeInOut);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        } else {
            // Once scroll is done, set the next scroll timeout
            setTimeout(() => {
                const nextY = window.scrollY + Math.floor(Math.random() * 351) + 900;
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    console.log("Reached the bottom of the page. Clicking the element...");
                    
                    // Click the specified element
                    const link = document.querySelector('a.prev-post-link');
                    if (link) {
                        link.click();
                        console.log("Clicked the element.");
                    } else {
                        console.log("Element not found.");
                    }

                    // Check if the URL contains '#google_vignette'
                    if (window.location.hash === '#google_vignette') {
                        console.log("URL contains '#google_vignette'. Reloading in 10 seconds...");
                        setTimeout(() => {
                            window.location.reload();
                        }, 10000); // Wait 10 seconds before reloading
                    } else {
                        // Wait 1 second before reloading
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }
                } else {
                    setTimeout(() => smoothScrollTo(nextY, Math.floor(Math.random() * 14001) + 4570), 1000);
                }
            }, 1000); // Delay before next scroll
        }
    }

    scroll();
}

// Start the scrolling process
function startScrolling() {
    const targetY = window.scrollY + Math.floor(Math.random() * 351) + 800;
    smoothScrollTo(targetY, 1000); // 1 second for smooth scroll
}

startScrolling();
