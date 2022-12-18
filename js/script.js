/* ******** Menu ******** */
var document;
((document) => {
  const $btnMenu = document.querySelector(".menu-btn"),
    $menu = document.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ******** Menu ******** */

/* ******** Dark theme ******** */
function darkTheme(btn, classDark) {
  const $themeBtn = document.querySelector(btn),
    $selectors = document.querySelectorAll("[data-dark]");

  //console.log($selectors);

  let moon = "🌙";
  let sun = "💡";

  const lightMode = () => {
    $selectors.forEach((el) => el.classList.remove(classDark));
    $themeBtn.textContent = moon;
    localStorage.setItem("theme", "light");
  };

  const darkMode = () => {
    $selectors.forEach((el) => el.classList.add(classDark));
    $themeBtn.textContent = sun;
    localStorage.setItem("theme", "dark");
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      console.log($themeBtn.textContent);
      if ($themeBtn.textContent === moon) {
        darkMode();
      } else {
        lightMode();
      }
    }
  });

  document.addEventListener("DOMContentLoaded", (e) => {
    //console.log(ls.getItem("theme"));
    if (localStorage.getItem("theme") === null)
      localStorage.setItem("theme", "light");
    if (localStorage.getItem("theme") === "light") {
      lightMode();
    }
    if (localStorage.getItem("theme") === "dark") {
      darkMode();
    }
  });
  scrollTopButton(".scroll-top-btn");
}
darkTheme(".dark-theme-btn", "dark-mode");

/* ******** ScrollTopButton ******** */

function scrollTopButton(btn) {
  const $scrollBtn = document.querySelector(btn);

  window.addEventListener("scroll", (e) => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 800) {
      $scrollBtn.classList.remove("hidden");
    } else {
      $scrollBtn.classList.add("hidden");
    }
    //console.log(window.pageYOffset, document.documentElement.scrollTo);
  });
  document.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
        //  left: 0,
      });
    }
  });
}

/* ******** ContactForm ******** */
((d) => {
  const $form = d.querySelector(".contact-form");
  const $loader = d.querySelector(".contact-form-loader");
  const $response = d.querySelector(".contact-form-response");

  if ($form) {
    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      $loader.classList.remove("none");
      fetch("https://formsubmit.co/ajax/shevo25gonzalez@gmail.com", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);
          location.hash = "#gracias";
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          let message =
            err.statusText || "An error occurred while sending, try again";
          $response.querySelector(
            "h3"
          ).innerHTML = `Error ${err.status}: ${message}`;
        })
        .finally(() => {
          $loader.classList.add("none");
          setTimeout(() => {
            location.hash = "#close";
          }, 3000);
        });
    });
  }
})(document);
