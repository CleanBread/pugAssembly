import activate from './helpers/activate';
import opened from './helpers/opened';
import absolute from './helpers/absolute';
import increaseNumb from './helpers/increaseNumb';

(() => {
    absolute()
    opened('[data-block="partners"]', 'morePartners')
    activate('listFirst', 'listFirst')
})();

(() => {
    let box = document.querySelector('[data-block="numbers"]');
    let isLeaving = false;
    const config = {
        threshold: 0.5
    }
    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                increaseNumb()
              self.unobserve(entry.target)
            }
        });
    }, config)
    observer.observe(box)
})();