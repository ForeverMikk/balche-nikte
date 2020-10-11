function navbarSwitcher(el) {
    // cache the reference to the logo element for use later
    const logo  = el.querySelector('.logoImg');
    
    // cache the magic words
    const DARK  = 'dark';
    const LIGHT = 'light'
  
    // define our state variables
    let scrolling = false;
    let theme = LIGHT;
  
    // define our different sources for easy access later
    const sources = {
      light: "../assets/image/logo-01.png",
      dark:  "http://via.placeholder.com/150x50/000/fff?text=logo"
    };
    
    // pre-load the images to prevent jank
    document.body.insertAdjacentHTML('beforeend', `
      <div style="display: none!important">
        <img src="${ sources[LIGHT] }">
        <img src="${ sources[DARK] }">
      </div>
    `);
  
    // define our scroll handler
    const scroll_handler = _ => setTimeout(_ => {
      // if we are already handling a scroll event, we don't want to handle this one.
      if (scrolling) return;
      scrolling = true;
  
      // determine which theme should be shown based on scroll position
      const new_theme = document.documentElement.scrollTop > 100 ? DARK : LIGHT;
  
      // if the current theme is the theme that should be shown, cancel execution
      if (new_theme === theme) {
        scrolling = false;
        return;
      }
  
      // change the values
      logo.src = sources[new_theme];
      el.classList.remove(theme);
      el.classList.add(new_theme);
  
      // update the state variables with the current state
      theme = new_theme;
      scrolling = false;
    });
  
    // assign the event listener to the window
    window.addEventListener('scroll', scroll_handler);
  }