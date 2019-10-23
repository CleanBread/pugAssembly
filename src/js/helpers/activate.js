
let activate = (blockMain, blockItem, className) => {
    let addedClass = className || 'active';

    let block = document.querySelector(`[data-block="${blockMain}"]`),
        categoryItems = block.querySelectorAll(`[data-item="${blockItem}"]`);
        
    categoryItems.forEach(element => {
        element.addEventListener('click', (evt) => {
            evt.stopPropagation()
            let actived = block.querySelectorAll(`[data-item="${blockItem}"].active`)
            
            element.classList.add(addedClass)
            actived.forEach(item => {
                item.classList.remove(addedClass)
            });


        })
    })
}

export default activate