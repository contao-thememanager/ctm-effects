window.useAnimation = (inViewOffset = "50px") => {
    initAnimation({
        inView: {
            offset: inViewOffset
        }
    })
}

window.useListAnimation = (inViewOffset = "50px") => {
    initAnimation({
        inView: {
            offset: inViewOffset
        },
        animate: {
            children: '.c_list',
            selectors: {
                prefix:   'animate__',
                perform:  'animate__animated',
                trigger:  'anim-list-tg-',
                in:       'anim-list-in-',
                out:      'anim-list-out-',
                delay:    'anim-list-dly-',
                duration: 'anim-list-dtn-'
            }
        }
    })
}

window.useEffect = () => {
    initEffect()
}

const getClassNameByPrefix = (el, prefix) => {
    if(!el.className.includes(prefix))
        return null;

    return el.className.split(prefix)[1].split(" ")[0]
}

const initEffect = (opts) => {
    const defaultOptions = {
        animate: {
            selectors: {
                prefix:   'effect__',
                perform:  'effect__animated',
                trigger:  'efc-tg-',
                effect:   'efc-anim-',
                duration: 'efc-dtn-',
                factor:   'efc-fct-',
                easing:   'efc-eas',
                scope:    'efc-sc-'
            }
        }
    }

    const options = {...defaultOptions, ...opts}

    const initEffectItem = (el, effectElement) => {
        // Get duration, easing and factor information
        let animationDuration = getClassNameByPrefix(el, options.animate.selectors.duration)
        let animationFactor = getClassNameByPrefix(el, options.animate.selectors.factor)
        let animationEasing = getClassNameByPrefix(el, options.animate.selectors.easing)

        // Duration works fine with custom props
        if(animationDuration)
            effectElement.style.setProperty('--effect-duration', animationDuration.replace('-', '.') + 's')

        if(animationFactor)
            effectElement.style.setProperty('--effect-factor', animationFactor.replace('-', '.'))

        if(animationEasing)
            effectElement.style.setProperty('--effect-easing', animationEasing)

        // Get effect
        const effectName = getClassNameByPrefix(el, options.animate.selectors.effect)

        // Add effect css class to the effect element
        effectElement.classList.add(options.animate.selectors.prefix + effectName)

        switch (getClassNameByPrefix(el, options.animate.selectors.trigger))
        {
            case 'hover':
                effectElement.addEventListener('mouseover', (e) => {
                    effectElement.classList.add(options.animate.selectors.perform)
                })

                effectElement.addEventListener('mouseleave', (e) => {
                    effectElement.classList.remove(options.animate.selectors.perform)
                })
                break
        }
    }

    document.querySelectorAll('[class*="' + options.animate.selectors.trigger + '"]')?.forEach((el) => {
        let effectElements;

        switch (getClassNameByPrefix(el, options.animate.selectors.scope))
        {
            case 'parent':
                effectElements = [el.closest('.inside')]
                break

            case 'inside':
                if(el.querySelector('.c_list'))
                {
                    effectElements = el.querySelectorAll('.c_list .inside')
                    break
                }

                effectElements = el.querySelectorAll('.inside')
                break

            case 'images':
                effectElements = el.querySelectorAll('.image_container')
                break

            case 'icons':
                effectElements = el.querySelectorAll('.c_icon')
                break

            case 'videos':
                effectElements = el.querySelectorAll('.video_container')
                break

            case 'mixed':
                effectElements = el.querySelectorAll('.image_container, .video_container, .c_icon')
                break

            default:
                effectElements = [el]
        }

        for(const effectElement of effectElements)
        {
            initEffectItem(el, effectElement)
        }
    })
}

const initAnimation = (opts) => {
    const defaultOptions = {
        inView: {
            root: null,
            offset: '50px',
            threshold: 0.5
        },
        animate: {
            children: null,
            selectors: {
                prefix:   'animate__',
                perform:  'animate__animated',
                trigger:  'anim-tg-',
                in:       'anim-in-',
                out:      'anim-out-',
                delay:    'anim-dly-',
                duration: 'anim-dtn-'
            }
        }
    }

    const options = {...defaultOptions, ...opts}

    const animate = (el, animationName, removeFromClasses) => {
        if(removeFromClasses)
            el.classList.remove(options.animate.selectors.perform, options.animate.selectors.prefix + removeFromClasses)

        el.classList.add(options.animate.selectors.perform, options.animate.selectors.prefix + animationName)
    }

    const animateInView = (observerElement, enter, exit) => {
        const observerOptions = {
            root:  options.inView.root,
            rootMargin: options.inView.offset,
            threshold: options.inView.threshold
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                entry.isIntersecting ?
                    enter.call(this) :
                    exit.call(this)
            });
        };

        (new IntersectionObserver(callback, observerOptions)).observe(observerElement);
    }

    const initAnimationItem = (el, animationElement, index) => {
        // Get trigger information
        let animationTrigger = getClassNameByPrefix(el, options.animate.selectors.trigger)

        // Get delay and duration information
        let animationDelay = getClassNameByPrefix(el, options.animate.selectors.delay)
        let animationDuration = getClassNameByPrefix(el, options.animate.selectors.duration)

        // Duration works fine with custom props
        if(animationDuration)
            animationElement.style.setProperty('--animate-duration', animationDuration.replace('-', '.') + 's')

        // Instead of overriding the custom-property as we did with the duration, we have to take a different way
        // for now because of a bug. (https://github.com/animate-css/animate.css/issues/1544) - 1552
        if(animationDelay){
            animationDelay = parseFloat(animationDelay.replace('-', '.'))

            if(options.animate.children) {
                animationDelay = animationDelay * index
            }

            animationElement.style.setProperty('--animate-delay', animationDelay + 's')
            animationElement.classList.add('animate__delay-1s')
        }

        // Get animations
        const inAnimationName = getClassNameByPrefix(el, options.animate.selectors.in)
        const outAnimationName = getClassNameByPrefix(el, options.animate.selectors.out)

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
    }

    document.querySelectorAll('[class*="' + options.animate.selectors.trigger + '"]')?.forEach((el) => {
        if(options.animate.children){
            el.querySelectorAll(options.animate.children + ' > *').forEach((animationElement, index) => {
                initAnimationItem(el, animationElement, index)
            })
        }else{
            initAnimationItem(el, el.querySelector(':scope > .inside') ? el.querySelector(':scope > .inside') : el, 0)
        }
    })
}
