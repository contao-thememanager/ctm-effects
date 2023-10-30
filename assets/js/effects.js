window.useAnimation = (iO = "50px") => { // inViewOffset
    initAnimation({
        i : { // inView
            o: iO
        }
    })
}

/*window.useEffect = () => {
    initEffect()
}*/

const getFxValueByPrefix = (e, p) => {
    if (!e.className.includes(p))
        return null

    return e.className.split(p)[1].split(" ")[0]
}

/*const initEffect = (opts) => {
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
        let animationDuration = getFxValueByPrefix(el, options.a.s.duration)
        let animationFactor = getFxValueByPrefix(el, options.a.s.factor)
        let animationEasing = getFxValueByPrefix(el, options.a.s.easing)

        // Duration works fine with custom props
        if(animationDuration)
            effectElement.style.setProperty('--effect-duration', animationDuration.replace('-', '.') + 's')

        if(animationFactor)
            effectElement.style.setProperty('--effect-factor', animationFactor.replace('-', '.'))

        if(animationEasing)
            effectElement.style.setProperty('--effect-easing', animationEasing)

        // Get effect
        const effectName = getFxValueByPrefix(el, options.a.s.effect)

        // Add effect css class to the effect element
        effectElement.classList.add(options.a.s.p + effectName)

        switch (getFxValueByPrefix(el, options.a.s.trigger))
        {
            case 'hover':
                effectElement.addEventListener('mouseover', (e) => {
                    effectElement.classList.add(options.a.s.x)
                })

                effectElement.addEventListener('mouseleave', (e) => {
                    effectElement.classList.remove(options.a.s.x)
                })
                break
        }
    }

    document.querySelectorAll('[class*="' + options.a.s.trigger + '"]')?.forEach((el) => {
        let effectElements

        switch (getFxValueByPrefix(el, options.a.s.t))
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
}*/

const initAnimation = (opts) => {
    const defaultOptions = {
        i: {                                        // inView
            r:              null,                   // root
            o:              '50px',                 // offset
            t:              0.5                     // suffix
        },
        a: {                                        // animate
            s: {                                    // selectors
                p:          'animate__',            // prefix
                s: {                                // suffix
                    i:      '-in-',                 // in
                    o:      '-out-'                 // out
                },
                x:          'animate__animated',    // perform
                l:          'c_list',               // list class
                t: {                                // scope
                    element: {                      // element
                        p:  'fx_anim',              // prefix
                        s:  '.fx_anim',             // selector
                        d:  'anim-dly-',            // delay
                        t:  'anim-dtn-'             // duration
                    },
                    text: {                         // text
                        p:  'fx_txt_anim',          // prefix
                        s:  '.c_text',              // selector
                        d:  'txt_anim-dly-',        // delay
                        t:  'txt_anim-dtn-'         // duration
                    },
                    image: {                        // image
                        p:  'fx_img_anim',          // prefix
                        s:  '.image_container',     // selector
                        d:  'img_anim-dly-',        // delay
                        t:  'img_anim-dtn-'         // duration
                    },
                    icon: {                         // icon
                        p:  'fx_ico_anim',          // prefix
                        s:  '.c_icon',              // selector
                        d:  'ico_anim-dly-',        // delay
                        t:  'ico_anim-dtn-'         // duration
                    },
                    link: {                         // link
                        p:  'fx_lnk_anim',          // prefix
                        s:  '.c_link',              // selector
                        d:  'lnk_anim-dly-',        // delay
                        t:  'lnk_anim-dtn-'         // duration
                    }
                }
            }
        }
    }

    const options = {...defaultOptions, ...opts}

    const animate = (el, animationName, removeFromClasses) => {
        if (removeFromClasses)
            el.classList.remove(options.a.s.x, options.a.s.p + removeFromClasses)

        el.classList.add(options.a.s.x, options.a.s.p + animationName)
    }

    const animateInView = (observerElement, enter, exit) => {
        const observerOptions = {
            root:       options.i.r, // inView.root
            rootMargin: options.i.o, // inView.offset
            threshold:  options.i.t  // inView.threshold
        }

        const callback = (entries) => {
            entries.forEach((entry) => {entry.isIntersecting ? enter.call(this) : exit.call(this)})
        }

        (new IntersectionObserver(callback, observerOptions)).observe(observerElement)
    }

    const removeInitClass = (el, to) => {
        const iS = to.p + options.a.s.s.i
        const oS = to.p + options.a.s.s.o; // Remove all initClasses

        [
            to.d + getFxValueByPrefix(el, to.d),
            to.t + getFxValueByPrefix(el, to.t),
            iS + getFxValueByPrefix(el, iS),
            oS + getFxValueByPrefix(el, oS)
        ].forEach(o => el.classList.contains(o) && el.classList.remove(o))
    }

    const initAnimationItem = (el, animationElement, index, typeOptions) => {
        // Get delay and duration information
        const animationDuration = getFxValueByPrefix(el, typeOptions.t)
        if (animationDuration)
            animationElement.style.setProperty('--animate-duration', animationDuration.replace('-', '.') + 's')

        const animationDelay = getFxValueByPrefix(el, typeOptions.d)
        if (animationDelay)
            animationElement.style.setProperty('--animate-delay', (parseFloat(animationDelay.replace('-', '.')) * (index + 1)).toFixed(3) + 's')

        // Get animations
        const inAnimationName = getFxValueByPrefix(el, typeOptions.p + options.a.s.s.i)
        const outAnimationName = getFxValueByPrefix(el, typeOptions.p + options.a.s.s.o)

        const inAnimation = inAnimationName ? () => animate(animationElement, inAnimationName, outAnimationName) : () => {}
        const outAnimation = outAnimationName ? () => animate(animationElement, outAnimationName, inAnimationName) : () => {}

        animateInView(el, inAnimation, outAnimation)
    }

    for (const type in options.a.s.t)
    {
        const typeOptions = options.a.s.t[type]

        document.querySelectorAll(`[class*="${typeOptions.p}"]`)?.forEach(el => {
            const initItem = (element, index) => initAnimationItem(el, element, index, typeOptions)

            switch (type) {
                case 'element':
                    if (!el.classList.contains(options.a.s.l)) {
                        initItem(el, 0)
                    } else {
                        Array.from(el.children)?.forEach((animationElement, index) => initItem(animationElement, index))
                    }
                    break

                default:
                    Array.from(el.querySelectorAll(typeOptions.s))?.forEach((animationElement, index) => initItem(animationElement, index))
            }

            removeInitClass(el, typeOptions)
        })
    }
}
