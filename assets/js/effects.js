window.useCtmEffects = (inViewOffset  = "50px") => { // inViewOffset
    initEffectsBundle({
        inView : { // inView
            offset: inViewOffset
        }
    })
}

const getFxValueByPrefix = (el, prefix) => {
    if (!el.className.includes(prefix))
        return null

    return el.className.split(prefix)[1].split(" ")[0]
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
        let animationDuration = getFxValueByPrefix(el, options.animate.selectors.duration)
        let animationFactor = getFxValueByPrefix(el, options.animate.selectors.factor)
        let animationEasing = getFxValueByPrefix(el, options.animate.selectors.easing)

        // Duration works fine with custom props
        if(animationDuration)
            effectElement.style.setProperty('--effect-duration', animationDuration.replace('-', '.') + 's')

        if(animationFactor)
            effectElement.style.setProperty('--effect-factor', animationFactor.replace('-', '.'))

        if(animationEasing)
            effectElement.style.setProperty('--effect-easing', animationEasing)

        // Get effect
        const effectName = getFxValueByPrefix(el, options.animate.selectors.effect)

        // Add effect css class to the effect element
        effectElement.classList.add(options.animate.selectors.prefix + effectName)

        switch (getFxValueByPrefix(el, options.animate.selectors.trigger))
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

        switch (getFxValueByPrefix(el, options.animate.selectors.scope))
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

const initEffectsBundle = (opts) => {
    const defaultOptions = {
        inView: {
            root:           null,
            offset:         '50px',
            threshold:      0.5
        },
        trigger:            'fx_',
        list:               'c_list',
        scope: {
            el: {
                animation:  '.fx_anim',
                effect:     '.fx_efc',
            },
            txt: {
                animation:  '.c_text',
                effect:     '.c_text',
            },
            img: {
                animation:  '.image_container',
                effect:     '.image_container',

            },
            ico: {
                animation:  '.c_icon',
                effect:     '.c_icon'
            },
            lnk: {
                animation:  '.c_link',
                effect:     '.c_link'
            }
        },
        animation: {
            abbr:           'anim',
            prefix:         'fxa_',
            perform:        'fxa_a',
            infixIn:        '-in-',
            infixOut:       '-out-',
            delay: {
                class:      'anim-dly-',
                prop:       '--fxa-d'
            },
            duration: {
                class:      'anim-dtn-',
                prop:       '--fxa-t'
            }
        },
        effect: {
            abbr:           'efc',
            prefix:         'fxe_',
            perform:        'fxe_a',
            infixHover:     '-hover-',
            factor : {
                class:      'efc-fct-',
                prop:       '--fxe-factor'
            },
            duration : {
                class:      'efc-dtn-',
                prop:       '--fxe-duration'
            },
            easing : {
                class:      'efc-eas-',
                prop:       '--fxe-easing'
            }
        }
    }

    const options = {...defaultOptions, ...opts}

    const animate = (el, name, removeFromClasses) => {
        if (removeFromClasses)
            el.classList.remove(options.animation.perform, options.animation.prefix + removeFromClasses)

        el.classList.add(options.animation.perform, options.animation.prefix + name)
    }

    const animateInView = (observerElement, enter, exit) => {
        const observerOptions = {
            root:       options.inView.root,
            rootMargin: options.inView.offset,
            threshold:  options.inView.threshold
        }

        const callback = (entries) => {
            entries.forEach((entry) => {entry.isIntersecting ? enter.call(this) : exit.call(this)})
        }

        (new IntersectionObserver(callback, observerOptions)).observe(observerElement)
    }

    const removeAnimationInitClass = (el, type, prefix = '') => {
        const {delay, duration, abbr, infixIn, infixOut} = options[type]
        const triggerPrefix = options.trigger + prefix;

        [
            (prefix + delay.class)            + getFxValueByPrefix(el, (prefix + delay.class)),
            (prefix + duration.class)         + getFxValueByPrefix(el, (prefix + duration.class)),
            (triggerPrefix + abbr + infixIn)  + getFxValueByPrefix(el, (triggerPrefix + abbr + infixIn)),
            (triggerPrefix + abbr + infixOut) + getFxValueByPrefix(el, (triggerPrefix + abbr + infixOut))
        ].forEach(option => el.classList.contains(option) && el.classList.remove(option))
    }

    const parseTimeProperty = (timeString, index = 0) => {
        return ((index + 1) * parseFloat(timeString.replace('-', '.'))).toFixed(3) + 's'
    }

    const initFxElement = (el, item, type, trigger, prefix, index) => {

        let inAnimationName, outAnimationName

        switch (type)
        {
            case 'animation':
                const delay = getFxValueByPrefix(el, prefix + options[type].delay.class)
                if (delay)
                    item.style.setProperty(options[type].delay.prop, parseTimeProperty(delay, index))

                const duration = getFxValueByPrefix(el, prefix + options[type].duration.class)
                if (duration)
                    item.style.setProperty(options[type].duration.prop, parseTimeProperty(duration))

                inAnimationName  = getFxValueByPrefix(el, trigger + options[type].infixIn)
                outAnimationName = getFxValueByPrefix(el, trigger + options[type].infixOut)

                const inAnimation  = inAnimationName  ? () => animate(item, inAnimationName, outAnimationName) : () => {}
                const outAnimation = outAnimationName ? () => animate(item, outAnimationName, inAnimationName) : () => {}

                animateInView(el, inAnimation, outAnimation)

                break

            case 'effect':

                break
        }
    }

    for (const scope in options.scope)
    {
        for (const type in options.scope[scope])
        {
            let infix = ('el' !== scope ? scope + '_' : '')
            let typeTrigger = options.trigger + infix + options[type].abbr

            document.querySelectorAll(`[class*="${typeTrigger}"]`)?.forEach(el => {
                const initItem = (item, index) => initFxElement(el, item, type, typeTrigger, infix, index)

                switch (scope)
                {
                    case 'el':
                        if (!el.classList.contains(options.list))
                            initItem(el, 0)
                        else
                            Array.from(el.children)?.forEach((item, index) => initItem(item, index))
                        break

                    default:
                        Array.from(el.querySelectorAll(options.scope[scope][type]))?.forEach((item, index) => initItem(item, index))
                }

                if ('animation' === type)
                    removeAnimationInitClass(el, type, infix)
            })
        }
    }
}
