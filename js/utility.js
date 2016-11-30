class Utility {


    constructor() {

        // For performance, the document is being cached
        const doc = document;

        const open = 'Opened';
        const close = 'Closed';

        // Define the ada methods
        const applyAdaText = this.applyAdaText.bind(this);
        const adaCheck = this.adaCheck.bind(this);

        // Cache the elements related to tabs
        const tabItems = doc.querySelectorAll('.spa-tab-controls li.tab-spa-item');
        const tabDisplay = this.tabDisplay.bind(this);

        // Cache all the headings that control the accordion animation
        const headingElements = doc.querySelectorAll('.tab_container .accordion_heading');
        const toggleAccordion = this.toggleAccordion.bind(this);


        // Cache the Inner tabs items
        const innerItems = doc.querySelectorAll('.inner-spa-tab-controls li.tab-spa-item');
        const innerTabsDisplay = this.innerTabsDisplay.bind(this);

        const innerContainer = doc.querySelectorAll('.inner_container .accordion_heading_inner');
        const toggleInnerAccordion = this.toggleInnerAccordion.bind(this);

        // Listen for the events taking place on inner tabs tabs
        Object.keys(innerItems).forEach((item) => {
            innerItems[item].addEventListener('click', (e) => {
                e.preventDefault();
                innerTabsDisplay(innerItems[item], doc, e);
            });
        });


        Object.keys(innerContainer).forEach((inner) => {
            innerContainer[inner].addEventListener('click', (e) => {
                e.preventDefault();
                toggleInnerAccordion(innerContainer[inner], doc, e);
            });
        });


        // Listen for the events taking place on the tabs
        Object.keys(tabItems).forEach((tab) => {
            tabItems[tab].addEventListener('click', (e) => {
                e.preventDefault();
                tabDisplay(tabItems[tab], doc, e);
            });
        });

        // Listen for the events taking place on the accordion heading
        Object.keys(headingElements).forEach((heading) => {
            headingElements[heading].addEventListener('click', (e) => {
                e.preventDefault();
                toggleAccordion(headingElements[heading], doc, e);
            });
        });

        adaCheck(tabItems, open, close);
        adaCheck(headingElements, open, close);
        adaCheck(innerItems, open, close);


    }


    applyAdaText(cache, open, close) {
        let el;

        cache.forEach((obj) => {
            el = obj.element;
            obj.text === 'Results' ? el.insertAdjacentHTML('beforeend', `<span class="ada-hidden">${open}</span>`) : el.insertAdjacentHTML('beforeend', `<span class="ada-hidden">${close}</span>`)
        });

    }


    adaCheck(headings, open, close) {
        let cache = [];

        Object.keys(headings).forEach((heading) => {
            cache.push({
                element: headings[heading],
                text: headings[heading].textContent
            });
        });

        this.applyAdaText(cache, open, close);
    }


    tabDisplay(tab, doc, e) {

        const panelId = tab.firstElementChild.hash;
        // Change the styling on the tabs
        const activeTab = doc.querySelector('.tab-spa-item.active');

        activeTab.classList.remove('active');
        activeTab.blur();

        e.currentTarget.classList.add('active');
        e.currentTarget.focus();

        // Remove the class from the current active tab
        const activePanel = doc.querySelector('.content_panel.active');

        activePanel.classList.remove('active');
        activePanel.blur();

        // publish the Accordion Hide Event to Sparta Events

        // Apply the class to the new active class
        const newPanel = doc.querySelector(panelId);

        newPanel.classList.add('active');
        newPanel.focus();
        // publish the Accordion Show Event to Sparta Events
    }


    toggleAccordion(heading, doc, e) {

        const panelId = heading.firstElementChild.hash;
        const activeHeading = doc.querySelector('.d_active.accordion_heading ');

        activeHeading.classList.remove('d_active');
        activeHeading.blur();

        e.currentTarget.classList.add('d_active');

        const activePanel = doc.querySelector('.content_panel.d_active');

        activePanel.classList.remove('d_active');
        activeHeading.blur();

        const newPanel = doc.querySelector(panelId);

        newPanel.classList.add('d_active');
        newPanel.focus();

    }


    toggleInnerAccordion(heading, doc, e) {
        const panelId2 = heading.firstElementChild.hash;
        const activeHeading2 = doc.querySelector('.inner_active.accordion_heading_inner ');

        activeHeading2.classList.remove('inner_active');
        activeHeading2.blur();

        e.currentTarget.classList.add('inner_active');

        const activePanel2 = doc.querySelector('.content_panel.inner_active');

        activePanel2.classList.remove('inner_active');
        activeHeading2.blur();

        const newPanel2 = doc.querySelector(panelId2);

        newPanel2.classList.add('inner_active');
        newPanel2.focus();
    }


    innerTabsDisplay(tab, doc, e) {

        const panelId = tab.firstElementChild.hash;

        // Change the styling on the tabs
        const activeTab = doc.querySelector('.tab-spa-item.inner_active');

        activeTab.classList.remove('inner_active');
        activeTab.blur();

        e.currentTarget.classList.add('inner_active');
        e.currentTarget.focus();
        // publish the Accordion Hide Event to Sparta Events

        const activePanel = doc.querySelector('.content_panel.inner_active');
        activePanel.classList.remove('inner_active');
        activePanel.blur();

        const newPanel = doc.querySelector(panelId);
        newPanel.classList.add('inner_active');
        newPanel.focus();

    }
}


const utility = new Utility();






