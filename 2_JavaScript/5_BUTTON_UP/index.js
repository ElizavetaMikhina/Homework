window.addEventListener('scroll', function() {
    const button = document.querySelector('.button-up');
    if (window.scrollY > 100) {
        button.classList.add('show');
    } else {
        button.classList.remove('show');
    }
});
