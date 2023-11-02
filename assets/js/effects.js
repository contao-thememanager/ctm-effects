window.useCtmEffects = (inViewOffset  = "50px") => { // inViewOffset
    initEffectsBundle({
        inView : { // inView
            offset: inViewOffset
        }
    })
}

const initEffectsBundle = (opts) => {
    const defaultOptions = {
        inView: {
            root:          null,
            offset:        '50px',
            threshold:     0.5
        },
        trigger:           'fx_',
        list:              'c_list',
        infix: {
            in:            '-in-',
            out:           '-out-',
            hover:         '-hover-'
        },
        scope: {
            el: {
                animation: '.fx_anim',
                effect:    '.fx_efc',
            },
            txt: {
                animation: '.c_text',
                effect:    '.c_text',
            },
            img: {
                animation: '.image_container',
                effect:    '.image_container',

            },
            ico: {
                animation: '.c_icon',
                effect:    '.c_icon'
            },
            lnk: {
                animation: '.c_link',
                effect:    '.c_link'
            }
        },
        animation: {
            abbr:          'anim',
            prefix:        'fxa_',
            perform:       'fxa_a',
            props: {
                delay: {
                    class: 'anim-dly-',
                    prop:  '--fxa-d'
                },
                duration: {
                    class: 'anim-dtn-',
                    prop:  '--fxa-t'
                }
            },
        },
        effect: {
            abbr:          'efc',
            prefix:        'fxe_',
            perform:       'fxe_a',
            props: {
                factor: {
                    class: 'efc-fct-',
                    prop:  '--fxe-factor'
                },
                duration: {
                    class: 'efc-dtn-',
                    prop:  '--fxe-duration'
                },
                easing: {
                    class: 'efc-eas-',
                    prop:  '--fxe-easing'
                }
            },
        }
    }

    const options = {...defaultOptions, ...opts}

    const getFxValueByPrefix = (el, prefix) => {
        if (!el.className.includes(prefix))
            return null

        return el.className.split(prefix)[1].split(" ")[0]
    }

    const animate = (el, name, removeFromClasses) => {
        if (removeFromClasses)
            el.classList.remove(options.animation.perform, options.animation.prefix + removeFromClasses)

        el.classList.add(options.animation.perform, options.animation.prefix + name)
    }

    const effect = (el, item, name) => {
        let fxTrigger, fxItem

        if (item.classList.contains('item'))
        {
            fxTrigger = fxItem = item.querySelector(':scope > .inside')
        }
        else if (!item.classList.contains('inside'))
        {
            fxTrigger = item.closest('.inside')
            fxItem = item
        }
        else
        {
            fxTrigger = fxItem = item
        }

        if (!fxTrigger || !fxItem)
            return

        fxItem.classList.add(options.effect.prefix + name)

        fxTrigger.addEventListener('mouseover', () => {
            fxItem.classList.add(options.effect.perform)
        })

        fxTrigger.addEventListener('mouseleave', () => {
            fxItem.classList.remove(options.effect.perform)
        })
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

    const getPropertyClass = (type, property, el, prefix) => {
        const cls = prefix + options[type]['props'][property].class
        return cls + getFxValueByPrefix(el, cls)
    }

    const getInfixClass = (type, el, prefix, infix) => {
        const abbreviation = options[type].abbr
        const inner = options.infix[infix]
        const triggerPrefix = options.trigger + prefix

       return triggerPrefix + abbreviation + inner + getFxValueByPrefix(el, triggerPrefix + abbreviation + inner)
    }

    const removeInitClasses = (type, el, prefix = '') => {
        let classes = []
        const props = options[type].props

        for (const property in props)
        {
            classes.push(getPropertyClass(type, property, el, prefix))
        }

        switch (type)
        {
            case 'animation':
                classes.push(
                    getInfixClass(type, el, prefix, options.infix.in),
                    getInfixClass(type, el, prefix, options.infix.out)
                )
                break

            case 'effect':
                classes.push(
                    getInfixClass(type, el, prefix, options.infix.hover)
                )
                break
        }

        el.classList.remove(...classes)
    };

    const parseTimeProperty = (timeString, index = 0) => {
        return ((index + 1) * parseFloat(timeString.replace('-', '.'))).toFixed(3) + 's'
    }

    const setFxProperty = (property, opts, el, item, type, prefix, index) => {

        const prop = opts.prop
        const value = getFxValueByPrefix(el, prefix + opts.class)

        if (!value)
            return

        switch (property)
        {
            case 'delay':
            case 'duration':
                item.style.setProperty(prop, parseTimeProperty(value, index))
                break

            case 'factor':
                item.style.setProperty(prop, value.replace('-', '.'))
                break

            default:
                item.style.setProperty(prop, value)
        }
    }

    const initFxElement = (el, item, type, trigger, prefix, index) => {

        switch (type)
        {
            case 'animation':
                const inAnimationName  = getFxValueByPrefix(el, trigger + options.infix.in)
                const outAnimationName = getFxValueByPrefix(el, trigger + options.infix.out)
                const inAnimation  = inAnimationName  ? () => animate(item, inAnimationName, outAnimationName) : () => {}
                const outAnimation = outAnimationName ? () => animate(item, outAnimationName, inAnimationName) : () => {}

                animateInView(el, inAnimation, outAnimation)
                break

            case 'effect':
                index = 0 // Do not add index timing to effects
                effect(el, item, getFxValueByPrefix(el, trigger + options.infix.hover))
                break
        }

        const props = options[type].props

        for (const property in props)
        {
            setFxProperty(property, props[property], el, item, type, prefix, index)
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

                removeInitClasses(type, el, infix)
            })
        }
    }
}
