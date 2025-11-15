import { onMounted, onUnmounted } from 'vue'

export const use_scroll_reveal = () => {
    let observer = null

    const init = () => {
        const elements = document.querySelectorAll('[data-scroll-reveal]')

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        })

        elements.forEach(el => observer.observe(el))
    }

    onMounted(() => init())
    onUnmounted(() => observer?.disconnect())
}