
class AccordionUtility {

  constructor() {
    // For performance, the document is being cached
    const doc = document;
    const openAll = doc.querySelectorAll('[data-one-at-time]');
    const setTheme = this.setTheme.bind(this);


    // Define the ada methods
    const applyAdaText = this.applyAdaText.bind(this);
    const adaCheck = this.adaCheck.bind(this);

    // Cache the elements related to tabs
    const tabItems = doc.querySelectorAll('.tab-controls li.tab-item');
    const tabDisplay = this.tabDisplay.bind(this);

    // Cache all the headings that control the accordion animation
    const headingElements = doc.querySelectorAll('.tab_container .accordion_heading');
    const toggleAccordion = this.toggleAccordion.bind(this);

    // Cache the Inner tabs items
    const innerItems = doc.querySelectorAll('.inner-tab-controls li.tab-item');
    const innerTabsDisplay = this.innerTabsDisplay.bind(this);

    const innerContainer = doc.querySelectorAll('.inner_container .accordion_heading_inner');
    const toggleInnerAccordion = this.toggleInnerAccordion.bind(this);

    //Define the close accordion panel method
    const closeActivePanel = this.closeActivePanel.bind(this);

    // Store all panels to remove the style property
    const allPanels = doc.querySelectorAll('.content_panel');

    //Unset or reset the containers depending on viewport
    const resetTabContainer = this.resetTabContainer.bind(this);


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
    adaCheck(tabItems, open, close);
    adaCheck(headingElements, open, close);
    adaCheck(innerItems, open, close);
    adaCheck(innerContainer, open, close);
    setTheme(openAll);
  }

  resetTabContainer(panels) {
    for (const panel of panels) {
      panel.removeAttribute('style');
      panel.classList.remove('inner_active');
    }
  }

  applyAdaText(cache, open, close) {
    let el;

    cache.forEach((obj) => {
      el = obj.element;
      obj.text === 'open' ? el.insertAdjacentHTML('beforeend', `<span class="ada-hidden">${open}</span>`) : el.insertAdjacentHTML('beforeend', `<span class="ada-hidden">${close}</span>`)
    });

  }

  setTheme(tabs) {
    let arr = [];

    Object.keys(tabs).forEach((tab) => {
      const dataEl = tabs[tab];
      const theme = dataEl.dataset ? dataEl.dataset.oneAtTime : dataEl.getAttribute('data-one-at-time');

      arr.push({ dataEl, theme, });
    });

    arr.forEach((obj) => {
      let el;
      el = obj.dataEl;
      if (obj.theme === 'false') {
        const styles = el.querySelectorAll('.accordion_heading');
        for (const style of styles) {
          style.classList.add('open-all');
        }
      }

    });

  }

  adaCheck(headings, open, close) {
    const cache = [];

    Object.keys(headings).forEach((heading) => {
      const element = headings[heading];
      const text = element.dataset ? element.dataset.ada : element.getAttribute('data-ada');

      cache.push({
        element,
        text,
      });
    });

    this.applyAdaText(cache, open, close);
  }

  tabDisplay(tab, e) {

    const panelId = tab.firstElementChild.hash;
    const paren = tab.parentElement;

    // Change the styling on the tabs
    const activeTab = paren.querySelector('.tab-item.active');

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

    // Apply the class to the new active class
    const newPanel = granParen.querySelector(panelId);

    newPanel.classList.add('active');
    newPanel.focus();
  }

  closeActivePanel(panel, heading) {
    if (panel) {
      const strVal = panel.className;
      const className = strVal.match(/(inner_active|d_active)/g).toString();
      panel.style.height = 0;
      panel.classList.remove(className);
      panel.blur();

      heading.classList.remove(className);
      heading.blur();
    }

  }

  toggleAccordion(heading, e) {

    const greatGran = heading.parentElement.parentElement.parentElement;
    // See whether one accordion is to animate or all of them
    const oneAtTime = greatGran.dataset.oneAtTime;
    const activeHeading = greatGran.querySelector('.d_active.accordion_heading');
    const target = e.currentTarget;
    const newPanel = target.nextElementSibling;
    const activePanel = greatGran.querySelector('.content_panel.d_active');

    if (oneAtTime == 'true') {
      if (!target.classList.contains('d_active')) {

        target.classList.add('d_active');
        target.focus();

        //Set height to content height
        newPanel.style.height = `${newPanel.scrollHeight}px`;
        newPanel.classList.add('d_active');
        newPanel.focus();

        //Call closeActivePanel method to remove any active heading or active panel
        this.closeActivePanel(activePanel, activeHeading);

      }

    } else if (oneAtTime == 'false') {

      const showHide = target.classList.toggle('d_active');
      if (showHide == false) {

        newPanel.style.height = 0;
        newPanel.classList.remove('d_active');
        newPanel.blur();
      } else if (showHide == true) {

        //Set height to content height
        newPanel.style.height = `${newPanel.scrollHeight}px`;
        newPanel.classList.add('d_active');
        newPanel.focus();
      }
    }
  }

  toggleInnerAccordion(heading, e) {

    const greatGran = heading.parentElement.parentElement.parentElement;
    const topLevel = heading.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    // See whether one accordion is to animate or all of them
    const oneAtTime = greatGran.dataset.oneAtTime;
    const activeInner = greatGran.querySelector('.inner_active.accordion_heading_inner');
    const innerTarget = e.currentTarget;
    const newDrawer = innerTarget.nextElementSibling;
    const activeDrawer = greatGran.querySelector('.content_panel.inner_active');
    const activeParent = topLevel.querySelector('.content_panel.d_active');

    if (oneAtTime == 'true') {
      if (!innerTarget.classList.contains('inner_active')) {
        innerTarget.classList.add('inner_active');

        innerTarget.focus();

        //Set height to content height
        newDrawer.style.height = `${newDrawer.scrollHeight}px`;
        newDrawer.classList.add('inner_active');
        newDrawer.focus();
        activeParent.style.height = 'auto';
        // Call closeActivePanel method to remove any active heading or active panel
        this.closeActivePanel(activeDrawer, activeInner);
      }

    } else if (oneAtTime == 'false') {

      const showHide = innerTarget.classList.toggle('inner_active');

      if (showHide == false) {
        newDrawer.style.height = 0;
        newDrawer.classList.remove('inner_active');
        newDrawer.blur();

      } else if (showHide == true) {
        newDrawer.classList.add('inner_active');
        newDrawer.style.height = `${newDrawer.scrollHeight}px`;
        activeParent.style.height = 'auto';
        newDrawer.focus();
      }

    }
  }

  innerTabsDisplay(tab, e) {

    const panelInId = tab.firstElementChild.hash;
    const paren = tab.parentElement;

    // Change the styling on the tabs
    const activeInTab = paren.querySelector('.tab-item.active');

    activeInTab.classList.remove('active');
    activeInTab.blur();

    const target = e.currentTarget;

    target.classList.add('active');
    target.focus();


    const granParen = tab.parentElement.parentElement;
    const activeInPanel = granParen.querySelector('.content_panel.active');
    activeInPanel.classList.remove('active');
    activeInPanel.blur();

    const newInPanel = granParen.querySelector(panelInId);

    newInPanel.classList.add('active');
    newInPanel.focus();

  }
}

export default new AccordionUtility();