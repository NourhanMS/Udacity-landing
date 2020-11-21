/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const NAV_CLASS = "menu__link";

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function getNavItemDetails() {
    const navSections = document.getElementsByTagName('section');
    let navItems = [];
    let navItemIDs = [];
    for(let i=0; i<navSections.length; i++){
        navItems.push(navSections[i].getAttribute("data-nav"));
        navItemIDs.push(navSections[i].getAttribute("id"));
    }
    return {navItems,navItemIDs}
}

function onNavItemClick(e){
    if (e.target.nodeName.toLowerCase() === 'a') {  // ← verifies target is desired element 
        let old_active_item = document.querySelector('.menu__link.active');
        if(old_active_item){
            old_active_item.classList.remove('active');
        }
        e.target.parentElement.classList.add('active');
        changeActiveSection(e.target.text);
    }
}

function changeActiveSection(dataNav){
    let old_active_section = document.querySelector('section.your-active-class');
    if(old_active_section){
        old_active_section.classList.remove('your-active-class');
    }
    let allSections = document.querySelectorAll('section');
    for(let section of allSections){
        if(section.getAttribute("data-nav") === dataNav){
            section.classList.add('your-active-class');
            break;
        }
    }
}

function changeActiveNav(dataNav){
    let old_active_item = document.querySelector('.menu__link.active');
    if(old_active_item){
        old_active_item.classList.remove('active');
    }
    let allItems = document.querySelectorAll('.menu__link');
    for(let item of allItems){
       if(item.textContent === dataNav){
           item.classList.add('active');
           break;
       }
    }
}

function onScroll(e){
    let allSections = document.querySelectorAll('section');
    for(let section of allSections){
        var sectionBoundries  = section.getBoundingClientRect();  
        if(sectionBoundries.top >= 0){
            console.log(sectionBoundries.top);
            let dataNav = section.getAttribute('data-nav');
            changeActiveSection(dataNav);
            changeActiveNav(dataNav);
            break;
        }
    }
}

function init(){
    buildNav();
    document.querySelector(".navbar__menu").addEventListener('click', e => onNavItemClick(e) );
    // Add class 'active' to section when near top of viewport on user scrolling 
    window.addEventListener('scroll', e => onScroll(e));
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    const {navItems,navItemIDs} = getNavItemDetails();
    const fragment = document.createDocumentFragment();
    const navigationListElement = document.getElementById('navbar__list');
    for(const index in navItems){
       let navigationItemElement = document.createElement('li');
       navigationItemElement.className = NAV_CLASS;
       if(index == 0){
        //Add active class to the first section's nav item 
        navigationItemElement.classList.add('active');
       }
       let navigationAnchorElement = document.createElement('a');
       navigationAnchorElement.textContent = navItems[index];
       navigationAnchorElement.setAttribute('href', '#'+ navItemIDs[index]);
       navigationItemElement.appendChild(navigationAnchorElement);
       fragment.appendChild(navigationItemElement);
    }
    navigationListElement.appendChild(fragment);
}


/**
 * End Main Functions
 * 
*/

// Build menu 
setTimeout(init(),0);
