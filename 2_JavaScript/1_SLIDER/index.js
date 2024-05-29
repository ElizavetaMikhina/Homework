document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
    const slider = document.getElementById('slider');
    const sliderContainer = document.querySelector('.slider__container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const scrollWidth = 500;
    let maxScrollLeft;

    const fetchApi = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            return [];
        }
    };

    const createSlideElement = (slide) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slider__item';
        slideElement.innerHTML = `<img src="${slide.url}" alt="${slide.title}" class="slider__image">`;
        return slideElement;
    };

    const appendSlides = (slides) => {
        slides.forEach(slide => {
            slider.appendChild(createSlideElement(slide));
        });
        maxScrollLeft = slider.scrollWidth - sliderContainer.clientWidth;
        updateButtons();
    };

    const fetchSlides = async () => {
        try {
            const slides = await fetchApi(apiUrl);
            appendSlides(slides.slice(0, 10));
        } catch (error) {
            console.error('Ошибка при загрузке слайдов:', error);
        }
    };

    const scrollSlider = (offset) => {
        sliderContainer.scrollBy({
            left: offset,
            behavior: 'smooth'
        });
    };

    const handlePrevClick = () => scrollSlider(-scrollWidth);
    const handleNextClick = () => scrollSlider(scrollWidth);

    const updateButtons = () => {
        const currentScroll = sliderContainer.scrollLeft;
        prevButton.setAttribute('aria-disabled', currentScroll <= 0);
        nextButton.setAttribute('aria-disabled', currentScroll >= maxScrollLeft);
        prevButton.disabled = currentScroll <= 0;
        nextButton.disabled = currentScroll >= maxScrollLeft;
    }

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && sliderContainer.scrollLeft < maxScrollLeft) {
                scrollSlider(scrollWidth);
            } else if (diff < 0 && sliderContainer.scrollLeft > 0) {
                scrollSlider(-scrollWidth);
            }
        }
    };

    prevButton.addEventListener('click', handlePrevClick);
    nextButton.addEventListener('click', handleNextClick);
    sliderContainer.addEventListener('scroll', updateButtons);

    // Прокрутка на телефоне
    sliderContainer.addEventListener('touchstart', handleTouchStart);
    sliderContainer.addEventListener('touchend', handleTouchEnd);

    fetchSlides();
});