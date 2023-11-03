window.useCtmEffects = (inViewOffset  = "-15% 0% -50px 0%") => {
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
            offset:        '-15% 0% -50px 0%"',
            threshold:     0
        },
        trigger:           'fx_',
        list:              'c_list',
        heading:           'c_headline',
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
        const animation = options.animation
        const perform   = animation.perform
        const prefix    = animation.prefix

        if (removeFromClasses)
            el.classList.remove(perform, prefix + removeFromClasses)

        el.classList.add(perform, prefix + name)
    }

    const effect = (el, item, name) => {
        let fxTrigger, fxItem

        if (item.classList.contains('item'))
        {
            fxTrigger = fxItem = item.querySelector(':scope > .inside')
        }
        else if (el.classList.contains(options.heading))
        {
            fxTrigger = fxItem = el
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

        const opt = options.effect

        fxItem.classList.add(opt.prefix + name)

        fxTrigger.addEventListener('mouseover', () => {
            fxItem.classList.add(opt.perform)
        })

        fxTrigger.addEventListener('mouseleave', () => {
            fxItem.classList.remove(opt.perform)
        })
    }

    const moveObserverElement = (el) => {
        let observer, item
        observer = item = el

        if (el.classList.contains('mod_article'))
            item = el.querySelector(':scope > .inside')
        else
            observer = el.parentElement

        return [observer, item]
    }

    const animateInView = (observerElement, item, inAnimationName, outAnimationName) => {

        if (!inAnimationName && !outAnimationName)
            return

        if (observerElement === item)
            [observerElement, item] = moveObserverElement(observerElement)

        if (!item)
            return

        const observerSettings = options.inView

        const observerOptions = {
            root:       observerSettings.root,
            rootMargin: observerSettings.offset,
            threshold:  observerSettings.threshold
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (inAnimationName && entry.isIntersecting)
                    animate(item, inAnimationName, outAnimationName)
                else if (outAnimationName && !entry.isIntersecting)
                    animate(item, outAnimationName, inAnimationName)
            })
        }, observerOptions)

        item.addEventListener('animationend', () => {
            if (!(inAnimationName && outAnimationName) || !(outAnimationName && inAnimationName))
                observer.disconnect();
        })

        observer.observe(observerElement)
    }

    const getPropertyClass = (type, property, el, prefix) => {
        const cls = prefix + options[type]['props'][property].class
        return cls + getFxValueByPrefix(el, cls)
    }

    const getInfixClass = (type, el, prefix, infix) => {
        const abbreviation  = options[type].abbr
        const triggerPrefix = options.trigger + prefix

        return triggerPrefix + abbreviation + infix + getFxValueByPrefix(el, triggerPrefix + abbreviation + infix)
    }

    const removeInitClasses = (type, el, prefix = '') => {
        let classes = []
        const props = options[type].props
        const infix = options.infix

        for (const property in props)
        {
            classes.push(getPropertyClass(type, property, el, prefix))
        }

        switch (type)
        {
            case 'animation':
                classes.push(
                    getInfixClass(type, el, prefix, infix.in),
                    getInfixClass(type, el, prefix, infix.out)
                )
                break

            case 'effect':
                classes.push(
                    getInfixClass(type, el, prefix, infix.hover)
                )
                break
        }

        el.classList.remove(...classes)
    }

    const parseTimeProperty = (timeString, index = 0) => {
        return ((index + 1) * parseFloat(timeString.replace('-', '.'))).toFixed(3) + 's'
    }

    const setFxProperty = (property, opts, el, item, type, prefix, index) => {

        const prop = opts.prop
        const val  = getFxValueByPrefix(el, prefix + opts.class)

        if (!val)
            return

        switch (property)
        {
            case 'delay':
                item.style.setProperty(prop, parseTimeProperty(val, index))
                break

            case 'duration':
                item.style.setProperty(prop, parseTimeProperty(val))
                break

            case 'factor':
                item.style.setProperty(prop, val.replace('-', '.'))
                break

            default:
                item.style.setProperty(prop, val)
        }
    }

    const initFxElement = (el, item, type, trigger, prefix, index) => {
        const infix = options.infix

        switch (type)
        {
            case 'animation':
                const inAnimationName  = getFxValueByPrefix(el, trigger + infix.in)
                const outAnimationName = getFxValueByPrefix(el, trigger + infix.out)

                animateInView(el, item, inAnimationName, outAnimationName)
                break

            case 'effect':
                index = 0 // Do not add index timing to effects
                effect(el, item, getFxValueByPrefix(el, trigger + infix.hover))
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
            let infix   = ('el' !== scope ? scope + '_' : '')
            let trigger = options.trigger + infix + options[type].abbr

            document.querySelectorAll(`[class*="${trigger}"]`)?.forEach(el => {
                const initItem = (item, index) => initFxElement(el, item, type, trigger, infix, index)

                switch (scope)
                {
                    case 'el':
                        if (![options.list, options.heading].some(cls => el.classList.contains(cls)))
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
