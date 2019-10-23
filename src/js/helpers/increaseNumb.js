let increaseNumb = () => {
    let infBlock = document.querySelector('[data-block="numbers"]')
    let numbers

    if(infBlock) {
        numbers = infBlock.querySelectorAll('.js-number')
    }

    var setValue = function(elem, value, shift, speed){
        var interval = false; 
        
        interval = setInterval(function(){
            if (elem.innerHTML*1+shift >= value) {
                elem.innerHTML = value;
                clearInterval(interval);
            } else {
                elem.innerHTML = elem.innerHTML*1+shift;
            }
        }, speed);
        
    };
    numbers.forEach((item, i) => {
        let numb = item.getAttribute('data-number')
        
        setValue(item, numb, 1, numb > 100 ? 5 : 80);
    })

}

export default increaseNumb