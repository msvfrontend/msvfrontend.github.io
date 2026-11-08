document.addEventListener('DOMContentLoaded', () => {
	const card = document.querySelector('.product-card');

	const images = [
		'./img/10245824_1.webp',
		'./img/10245824_2.webp',
		'./img/10245824_3.webp'
	];

	const imgElement = card.querySelector('.main-image');
	const dots = card.querySelectorAll('.dot');
	const prevBtn = card.querySelector('.rotator-prev');
	const nextBtn = card.querySelector('.rotator-next');
	
	let currentIndex = 0;

	function updateImage(newIndex) {
		currentIndex = newIndex;
		imgElement.src = images[currentIndex];
		dots.forEach((d, idx) => {
			d.classList.toggle('active', idx === currentIndex);
		});
	}

	nextBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		const nextIndex = (currentIndex + 1) % images.length;
		updateImage(nextIndex);
	});

	prevBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		const prevIndex = (currentIndex - 1 + images.length) % images.length;
		updateImage(prevIndex);
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const index = parseInt(e.target.getAttribute('data-index'), 10);
			updateImage(index);
		});
	});
});