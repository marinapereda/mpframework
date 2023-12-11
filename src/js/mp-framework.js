import '../scss/mp-framework.scss';


/*************************************************************************** 
  MP Buttons
****************************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    const mpButtons = document.querySelectorAll('.mp-button');
    
    mpButtons.forEach((button) => {
        const children = Array.from(button.childNodes);
        let firstIIndex = children.findIndex(node => node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'i');
        let firstTextIndex = children.findIndex(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '');

        if(firstIIndex !== -1 && firstTextIndex !== -1) {
            if (firstIIndex < firstTextIndex) {
                button.classList.add('mp-icon-start');
            } else {
                button.classList.add('mp-icon-end');
            }
        } else if(firstIIndex !== -1) {
            // Only <i> element is present, can be at start or end
            if(firstIIndex === 0) {
                button.classList.add('mp-icon-start');
            } else {
                button.classList.add('mp-icon-end');
            }
        }
    });
});