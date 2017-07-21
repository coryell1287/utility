class Utility {


  constructor() {

    // For performance, the document is being cached
    const doc = document;
    const openAll = doc.querySelectorAll('[data-one-at-time]');
    const setTheme = this.setTheme.bind(this);


    // Pull the open and close text off of the spaParams object
    const open = 'open';
    const close = 'close';

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

    const closeAccordion = this.closeAccordion.bind(this);
    const closeInnerAccord = this.closeInnerAccord.bind(this);

    //Set the height for the accordion containers
    const activeAccordionOuter = doc.querySelector('.content_panel.d_active');
    const activeAccordionInner = doc.querySelector('.content_panel.inner_active');

    activeAccordionOuter.style.height = `${activeAccordionOuter.scrollHeight}px`;
    activeAccordionInner.style.height = `${activeAccordionInner.scrollHeight}px`;

    // Listen for the events taking place on inner tabs tabs
    Object.keys(innerItems).forEach((item) => {
      innerItems[item].addEventListener('click', (e) => {
        e.preventDefault();
        innerTabsDisplay(innerItems[item], e);
      });
    });


    Object.keys(innerContainer).forEach((inner) => {
      innerContainer[inner].addEventListener('click', (e) => {
        e.preventDefault();
        toggleInnerAccordion(innerContainer[inner], e);
      });
    });

    Object.keys(innerContainer).forEach((inner) => {
      innerContainer[inner].addEventListener('dblclick', (e) => {
        e.preventDefault();
        closeInnerAccord(innerContainer[inner]);
      });
    });


    // Listen for the events taking place on the tabs
    Object.keys(tabItems).forEach((tab) => {
      tabItems[tab].addEventListener('click', (e) => {
        e.preventDefault();
        tabDisplay(tabItems[tab], e);
      });
    });

    // Listen for the events taking place on the accordion heading
    Object.keys(headingElements).forEach((heading) => {
      headingElements[heading].addEventListener('click', (e) => {
        e.preventDefault();
        toggleAccordion(headingElements[heading], e);
      });
    });


    // Listen for the events taking place on the accordion heading
    Object.keys(headingElements).forEach((heading) => {
      headingElements[heading].addEventListener('dblclick', (e) => {
        e.preventDefault();
        closeAccordion(headingElements[heading]);
      });
    });


    adaCheck(tabItems, open, close);
    adaCheck(headingElements, open, close);
    adaCheck(innerItems, open, close);
    adaCheck(innerContainer, open, close);
  }


  applyAdaText(cache, open, close) {
    let el;

    cache.forEach((obj) => {
      el = obj.element;
      obj.text === 'open' ? el.insertAdjacentHTML('beforeend', `<span class="ada-hidden">${open}</span>`) : el.insertAdjacentHTML('beforeend', `<span class="ada-hidden">${close}</span>`)
    });

  }


  adaCheck(headings, open, close) {
    let cache = [];

    Object.keys(headings).forEach((heading) => {
      cache.push({
        element: headings[heading],
        text: headings[heading].dataset.ada
      });
    });

    this.applyAdaText(cache, open, close);
  }

  closeInnerAccord(heading) {

    const greatGran = heading.parentElement.parentElement.parentElement;

    // See whether one accordion is to animate or all of them
    const oneAtTime = greatGran.dataset.oneAtTime;

    if (oneAtTime == 'false') {

      const innerHash = heading.firstElementChild.hash;
      const openInAccord = greatGran.querySelector('.inner_active.accordion_heading_inner');
      const openInDrawer = greatGran.querySelector(innerHash);

      openInAccord.classList.remove('inner_active');

      openInDrawer.style.height = 0;
      openInDrawer.classList.remove('inner_active');

    } else {
      return false;
    }
  }

  closeAccordion(heading) {

    const greatGran = heading.parentElement.parentElement.parentElement;

    // See whether one accordion is to animate or all of them
    const oneAtTime = greatGran.dataset.oneAtTime;

    if (oneAtTime == 'false') {

      const hashId = heading.firstElementChild.hash;
      const openAccord = greatGran.querySelector('.d_active.accordion_heading');
      const openDrawer = greatGran.querySelector(hashId);


      openAccord.classList.remove('d_active');

      openDrawer.style.height = 0;
      openDrawer.classList.remove('d_active');

    } else {
      return false;
    }
  }

  tabDisplay(tab, e) {

    const panelId = tab.firstElementChild.hash;
    const paren = tab.parentElement;

    // Change the styling on the tabs
    const activeTab = paren.querySelector('.tab-spa-item.active');

    activeTab.classList.remove('active');
    activeTab.blur();

    const target = e.currentTarget;
    target.classList.add('active');
    target.focus();

    // Remove the class from the current active tab
    const granParen = tab.parentElement.parentElement;
    const activePanel = granParen.querySelector('.content_panel.active');

    activePanel.classList.remove('active');
    activePanel.blur();

    // publish the Accordion Hide Event to Sparta Events

    // Apply the class to the new active class
    const newPanel = granParen.querySelector(panelId);

    newPanel.classList.add('active');
    newPanel.focus();
    // publish the Accordion Show Event to Sparta Events
  }


  toggleAccordion(heading, e) {

    const greatGran = heading.parentElement.parentElement.parentElement;

    // See whether one accordion is to animate or all of them
    const oneAtTime = greatGran.dataset.oneAtTime;
    const activeHeading = greatGran.querySelector('.d_active.accordion_heading');

    if (oneAtTime == 'true') {

      activeHeading.classList.remove('d_active');
      activeHeading.blur();

      const target = e.currentTarget;
      target.classList.add('d_active');

      const activePanel = greatGran.querySelector('.content_panel.d_active');

      // Before removing the class, set the height to zero
      activePanel.style.height = 0;
      activePanel.classList.remove('d_active');
      activeHeading.blur();

      const newPanel = target.nextElementSibling;
      const parentPanelHeight = newPanel.scrollHeight;

      //Set height to content height
      newPanel.style.height = `${newPanel.scrollHeight}px`;

      newPanel.classList.add('d_active');
      newPanel.focus();

    } else if (oneAtTime == 'false') {

      const target = e.currentTarget;
      target.classList.add('d_active');

      const newPanel = target.nextElementSibling;
      const parentPanelHeight = newPanel.scrollHeight;

      //Set height to content height
      newPanel.style.height = `${newPanel.scrollHeight}px`;

      newPanel.classList.add('d_active');
      newPanel.focus();

    }


  }


  toggleInnerAccordion(heading, e) {


    const greatGran = heading.parentElement.parentElement.parentElement;
    const topLevel = heading.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    const oneAtTime = greatGran.dataset.oneAtTime;

    const activeInnerHeading = greatGran.querySelector('.inner_active.accordion_heading_inner');

    if (oneAtTime === 'true') {

      const activeParent = topLevel.querySelector('.content_panel.d_active');
      activeInnerHeading.classList.remove('inner_active');
      activeInnerHeading.blur();

      const activeDrawer = greatGran.querySelector('.content_panel.inner_active');

      activeDrawer.style.height = 0;
      const target = e.currentTarget;
      target.classList.add('inner_active');

      const parentHeight = activeParent.scrollHeight;
      const activeHeight = activeDrawer.scrollHeight;

      //Reset height to 0 before removing class
      activeDrawer.classList.remove('inner_active');
      activeInnerHeading.blur();

      const newDrawer = activeInnerHeading.nextElementSibling;
      //Seet height to content height
      newDrawer.style.height = `${newDrawer.scrollHeight}px`;

      // Get parent, subtract active, add new
      activeParent.style.height = `${parentHeight - activeHeight + newDrawer.scrollHeight}px`;
      newDrawer.classList.add('inner_active');
      newDrawer.focus();

    } else {

      const activeDrawer = greatGran.querySelector('.content_panel.inner_active');
      const activeParent = topLevel.querySelector('.content_panel.d_active');

      activeDrawer.style.height = 0;
      const target = e.currentTarget;
      target.classList.add('inner_active');

      const parentHeight = activeParent.scrollHeight;
      const activeHeight = activeDrawer.scrollHeight;

      const newDrawer = activeInnerHeading.nextElementSibling;
      //Set height to content height
      newDrawer.style.height = `${newDrawer.scrollHeight}px`;

      //Get parent, subtract active, add new
      activeParent.style.height = `${parentHeight - activeHeight + newDrawer.scrollHeight}px`;
      newDrawer.classList.add('inner_active');
      newDrawer.focus();

    }

  }


  innerTabsDisplay(tab, e) {

    const panelInId = tab.firstElementChild.hash;
    const paren = tab.parentElement;

    // Change the styling on the tabs
    const activeInTab = paren.querySelector('.tab-spa-item.inner_active');

    activeInTab.classList.remove('inner_active');
    activeInTab.blur();

    const target = e.currentTarget;

    target.classList.add('inner_active');
    target.focus();
    // publish the Accordion Hide Event to Sparta Events

    const granParen = tab.parentElement.parentElement;
    const activeInPanel = granParen.querySelector('.content_panel.inner_active');

    activeInPanel.classList.remove('inner_active');
    activeInPanel.blur();

    const newInPanel = granParen.querySelector(panelInId);

    newInPanel.classList.add('inner_active');
    newInPanel.focus();

  }


}


const utility = new Utility();






