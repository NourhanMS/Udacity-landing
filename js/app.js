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

/**
* Function loops over sections and returns (name and id) of all navbar items that we need to build
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

//Scroll to the section having id = clicked anchor attribute (data-url)
function scrollIntoSection(e){
    let section_to_go_id = e.target.getAttribute('data-url');
    let section_to_go = document.getElementById(section_to_go_id);
    if(section_to_go){
        section_to_go.scrollIntoView({behavior: "smooth"});
    }
}

function onNavItemClick(e){
    e.preventDefault();
    if (e.target.nodeName.toLowerCase() === 'a') {  // ← verifies target is desired element 
        this.scrollIntoSection(e);
        //Change the current active nav item
        let old_active_item = document.querySelector('.menu__link.active');
        if(old_active_item){
            old_active_item.classList.remove('active');
        }
        e.target.parentElement.classList.add('active');
        changeActiveSection(e.target.text);
    }
}

/**
* Function changes the active section's class
@input : dataNav  (data-nav is the name of the attribute given to the active section)
* 
*/
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

/**
* Function changes the active item navbar's class
@input : dataNav  (data-nav is the name of the attribute given to the active section)
* 
*/
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

//Function responsible for detecting the currenct active section on user's scrolling
function onScroll(e){
    let allSections = document.querySelectorAll('section');
    for(let section of allSections){
        var sectionBoundries  = section.getBoundingClientRect();  
        if(sectionBoundries.top >= 0){
            let dataNav = section.getAttribute('data-nav');
            changeActiveSection(dataNav);
            changeActiveNav(dataNav);
            break;
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function init(){
    buildNav();
    document.querySelector(".navbar__menu").addEventListener('click', e => onNavItemClick(e) );
    // Add class 'active' to the  section near to the top of viewport on user's  scrolling 
    window.addEventListener('scroll', e => onScroll(e));
}

/**
 *  Build the navbar
 */

function buildNav(){
    const {navItems,navItemIDs} = getNavItemDetails();
    const fragment = document.createDocumentFragment();
    for(const index in navItems){
       let navigationItemElement = document.createElement('li');
       navigationItemElement.className = NAV_CLASS;
       if(index == 0){
        //Add active class to the first section's nav item 
        navigationItemElement.classList.add('active');
       }
       let navigationAnchorElement = document.createElement('a');
       navigationAnchorElement.textContent = navItems[index];
       navigationAnchorElement.setAttribute('data-url', navItemIDs[index]);
       navigationAnchorElement.setAttribute('href', '');
       navigationItemElement.appendChild(navigationAnchorElement);
       fragment.appendChild(navigationItemElement);
    }
    const navigationListElement = document.getElementById('navbar__list');
    navigationListElement.appendChild(fragment);
}


/**
 * End Main Functions
 *
*/

//Code starting point  
// Init function builds the navbar and initiate event listeners 
setTimeout(init(),0);
