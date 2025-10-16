// Burger Landing - Main JavaScript

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute('href'))
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	})
})

// Изменение хедера при прокрутке
const header = document.querySelector('.header')
let lastScroll = 0

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset

	if (currentScroll > 100) {
		header.classList.add('header--scrolled')
	} else {
		header.classList.remove('header--scrolled')
	}

	lastScroll = currentScroll
})

// Обработка формы заказа
const orderForm = document.querySelector('.order-form__form')
if (orderForm) {
	orderForm.addEventListener('submit', e => {
		e.preventDefault()

		// Получение данных формы
		const formData = new FormData(orderForm)
		const data = Object.fromEntries(formData)

		// Здесь должна быть отправка данных на сервер
		console.log('Данные формы:', data)

		// Показать сообщение об успехе
		alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.')

		// Очистить форму
		orderForm.reset()
	})
}

// Маска для телефона
const phoneInputs = document.querySelectorAll('input[type="tel"]')
phoneInputs.forEach(input => {
	input.addEventListener('input', e => {
		let value = e.target.value.replace(/\D/g, '')

		if (value.length > 0) {
			if (value[0] === '7' || value[0] === '8') {
				value = value.substring(1)
			}

			let formattedValue = '+7'

			if (value.length > 0) {
				formattedValue += ' (' + value.substring(0, 3)
			}
			if (value.length >= 4) {
				formattedValue += ') ' + value.substring(3, 6)
			}
			if (value.length >= 7) {
				formattedValue += '-' + value.substring(6, 8)
			}
			if (value.length >= 9) {
				formattedValue += '-' + value.substring(8, 10)
			}

			e.target.value = formattedValue
		}
	})
})

// Переключение категорий меню
const menuCategories = document.querySelectorAll('.menu__category')
menuCategories.forEach(category => {
	category.addEventListener('click', e => {
		e.preventDefault()

		// Убрать активный класс у всех категорий
		menuCategories.forEach(cat =>
			cat.classList.remove('menu__category--active')
		)

		// Добавить активный класс к текущей категории
		category.classList.add('menu__category--active')

		// Здесь можно добавить логику загрузки соответствующего меню
		console.log('Выбрана категория:', category.textContent)
	})
})

// Анимация при скролле (появление элементов)
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate-in')
			observer.unobserve(entry.target)
		}
	})
}, observerOptions)

// Наблюдать за секциями
const sections = document.querySelectorAll('.section')
sections.forEach(section => {
	observer.observe(section)
})

// Наблюдать за элементами features
const featureItems = document.querySelectorAll('.features__item')
featureItems.forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.1}s`
	observer.observe(item)
})

// Кнопки "Заказать" открывают форму заказа
const orderButtons = document.querySelectorAll(
	'.hero__btn, .product__btn, .header__btn'
)
orderButtons.forEach(btn => {
	btn.addEventListener('click', e => {
		e.preventDefault()
		const orderSection = document.querySelector('#order')
		if (orderSection) {
			orderSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	})
})

console.log('🍔 Burger Landing loaded successfully!')
