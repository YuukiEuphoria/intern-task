document.addEventListener("DOMContentLoaded", function () {
  const navList = document.querySelector(".header__nav-list");
  let swiperInstance;
  var barElement = document.querySelector('.bar');


  barElement.addEventListener('click', function() {
    alert('Здесь должно было появляться модальное окно с навигацией 🥹');
});


  function toggleNav() {
    if (window.innerWidth < 650) {
      navList.style.display = "none";
    } else {
      navList.style.display = "flex";
    }
  }

  function addClassOnScroll() {
    var header = document.querySelector(".header");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function setSlidesPerView() {
    if (window.innerWidth < 768) {
      swiperInstance.params.slidesPerView = 1;
    } else if (window.innerWidth < 960) {
      swiperInstance.params.slidesPerView = 2;
    } else {
      swiperInstance.params.slidesPerView = 3;
    }
    swiperInstance.update();
  }

  document.querySelector("#btn").addEventListener("click", function () {
    let cardsContainer = document.querySelector(
      ".swiper-wrapper.cards-container"
    );

    if (cardsContainer.innerHTML) {
      cardsContainer.innerHTML = "";
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((users) => {
          if (cardsContainer) {
            users.forEach((user) => {
              let swiperSlide = document.createElement("div");
              swiperSlide.className = "swiper-slide";

              let card = document.createElement("div");
              card.className = "card";

              let cardInner = document.createElement("div");
              cardInner.className = "card-inner";

              let cardFront = document.createElement("div");
              cardFront.className = "card-front";
              cardFront.innerHTML = `
                      <p>Имя: ${user.name}</p>
                      <p>Имя пользователя: ${user.username}</p>
                      <p>Email: ${user.email}</p>
                      <p>Телефон: ${user.phone}</p>
                      <p>Веб-сайт: ${user.website}</p>
                  `;
              cardInner.appendChild(cardFront);

              let cardBack = document.createElement("div");
              cardBack.className = "card-back";
              cardBack.innerHTML = `
                      <p>Улица: ${user.address.street}</p>
                      <p>Квартира: ${user.address.suite}</p>
                      <p>Город: ${user.address.city}</p>
                      <p>Почтовый индекс: ${user.address.zipcode}</p>
                      <p>Компания: ${user.company.name}</p>
                      <p>Слоган: ${user.company.catchPhrase}</p>
                  `;
              cardInner.appendChild(cardBack);

              card.appendChild(cardInner);
              swiperSlide.appendChild(card);
              cardsContainer.appendChild(swiperSlide);

              card.addEventListener("click", function () {
                cardInner.style.transform =
                  cardInner.style.transform == "rotateY(180deg)"
                    ? "rotateY(0deg)"
                    : "rotateY(180deg)";
              });
            });

            swiperInstance = new Swiper(".swiper-container", {
              slidesPerView:
                window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3,
              spaceBetween: 10,
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },
            });

            window.addEventListener("resize", setSlidesPerView);
          }
        })
        .catch((error) => console.error("Ошибка:", error));
    }
  });

  window.addEventListener("resize", function () {
    toggleNav();
    setSlidesPerView();
  });

  window.onscroll = function () {
    addClassOnScroll();
  };

  toggleNav();
});
