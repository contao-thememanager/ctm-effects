import 'animate.css';

const initAnimation = (inViewOffset = '50px') => {
    const animateStartClassName = 'animate__animated'
    const animatePrefix = 'animate__'

    const animationTriggerSelector = 'anim-tg-'
    const animationInSelector = 'anim-in-'
    const animationOutSelector = 'anim-out-'

    const animate = (el, animationName, removeFromClasses) => {
        if(removeFromClasses)
            el.classList.remove(animateStartClassName, animatePrefix + removeFromClasses)

        el.classList.add(animateStartClassName, animatePrefix + animationName)
    }

    const animateInView = (observerElement, enter, exit) => {
        const options = {
            root: null,
            rootMargin: inViewOffset,
            threshold: 0.5
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                entry.isIntersecting ?
                    enter.call(this) :
                    exit.call(this)
            });
        };

        (new IntersectionObserver(callback, options)).observe(observerElement);
    }

    const getClassNameByPrefix = (el, prefix) => {
        if(!el.className.includes(prefix))
            return null;

        return el.className.split(prefix)[1].split(" ")[0]
    }

    const animationElements = document.querySelectorAll('[class*="' + animationTriggerSelector + '"]')

    animationElements.forEach((el) => {
        // Get animation trigger
        const animationTrigger = getClassNameByPrefix(el, animationTriggerSelector)
        const animationElement = el.querySelector(':scope > .inside') ? el.querySelector(':scope > .inside') : el

        // Get animations
        const inAnimationName = getClassNameByPrefix(el, animationInSelector)
        const outAnimationName = getClassNameByPrefix(el, animationOutSelector)

        switch (animationTrigger)
        {
            case 'inview':
                const inAnimation = inAnimationName ?
                    () => { animate(animationElement, inAnimationName, outAnimationName) } :
                    () => { }

                const outAnimation = outAnimationName ?
                    () => { animate(animationElement, outAnimationName, inAnimationName) } :
                    () => { }

                animateInView(el, inAnimation, outAnimation)
                break

            default:
                animate(animationElement, inAnimationName, outAnimationName)
        }
    })
}
