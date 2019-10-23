let opened = (item, btnDataClass, className, toggle, once, overflow) => {
    let addedClass = className || 'opened'
    let block = document.querySelectorAll(item);

    block.forEach(element => {

        if(toggle) {
            let btn = element.querySelector(`[data-btn="${btnDataClass}"]`) || element

            btn.addEventListener('click', (evt) => {
                evt.stopPropagation()

                if(once) {
                    let actived = document.querySelectorAll(`${item}.${className}`)

                    actived.forEach(item => {
                        item.classList.remove(className)
                    });
                }

                element.classList.toggle(addedClass)
            })
        } else {
            let openBtn = element.querySelector(`[data-btn-open="${btnDataClass}"]`) || element,
                closeBtns = element.querySelectorAll(`[data-btn-close="${btnDataClass}"]`);


                openBtn.addEventListener('click', (evt) => {
                    evt.stopPropagation()
                    element.classList.add(addedClass)
                    if(overflow) {
                        document.body.style.overflow = 'hidden'
                    }
                })
                
                closeBtns.forEach(item => {
                    item.addEventListener('click', (evt) => {
                        evt.stopPropagation()
                        element.classList.remove(addedClass)
                        document.body.style.overflow = 'auto'
                    })
                });
        }
    })
}

export default opened