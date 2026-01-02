// Premium Page Transitions
document.addEventListener('DOMContentLoaded', () => {

    // Reveal Page on Load
    const overlay = document.querySelector('.transition-overlay');
    const wipe = document.querySelector('.transition-wipe');

    // Slight delay to ensure content is ready
    setTimeout(() => {
        wipe.classList.add('active-enter');
    }, 100);

    // Handle Links
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        // Only target internal links that are not hash links
        if (link.hostname === window.location.hostname && !link.hash.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Stop default navigation

                const targetUrl = link.href;

                // Start Exit Animation
                // Reset enter class if present
                wipe.classList.remove('active-enter');
                wipe.classList.add('active-exit');

                // Navigate after animation completes (matching CSS duration)
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 800);
            });
        }
    });

});
