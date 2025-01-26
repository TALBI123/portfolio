const btnsChooseSkill = document.querySelectorAll(".choose-skills-tools > *");
const navSections = document.querySelectorAll(".nav-section");
let isClicked = false;
const removeAndAddClass = (arr, str, Class) => {
  arr.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(Class).classList.remove(str);
      btn.classList.add(str);
    });
  });
};
const removeSmothlyEmailBtn = (obj1, obj2) => {
  return new Promise((res) => {
    obj1.classList.add("remove-smothly");
    obj2.classList.remove("disabled");
    setTimeout(() => {
      obj2.classList.add("remove-smothly");
    }, 100);
    setTimeout(() => {
      obj2.classList.remove("remove-smothly");
      setTimeout(() => {
        obj2.classList.add("disabled");
        obj1.classList.remove("remove-smothly");
        res("are completed");
      }, 100);
      isClicked = false;
    }, 4000);
  });
};
const removeSmothly = (obj1, obj2) => {
  obj1.classList.add("remove-smothly");
  setTimeout(() => {
    obj1.classList.add("disabled");
    obj1.classList.remove("remove-smothly");
    obj2.classList.remove("disabled");
  }, 500);
};
//nav btns
removeAndAddClass(navSections, "im-here", ".im-here");
const sections = document.querySelectorAll("section");
const interctionSections = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      const classObj = entry.target.getAttribute('data-name');
      document.querySelector('.im-here').classList.remove('im-here');
      document.querySelector(`.inner-nav li.${classObj}`).classList.add('im-here');
    }
  });
},{rootMargin: "-200px"});
sections.forEach((section) => interctionSections.observe(section));
// ----------- About Section -----------
removeAndAddClass(
  btnsChooseSkill,
  "is-clicked",
  ".choose-skills-tools > *.is-clicked"
);
document.querySelectorAll(".choose-skills-tools > *").forEach((elm, index) => {
  elm.addEventListener("click", () => {
    const isAlreadyClicked = elm.classList.contains("was-it-clicked");
    if (isAlreadyClicked) return;
    const parentsIcons = document.querySelectorAll(
      ".container-techologies > *"
    );
    document
      .querySelector(".was-it-clicked")
      .classList.remove("was-it-clicked");
    elm.classList.add("was-it-clicked");
    console.log(isAlreadyClicked);
    const arr = index ? parentsIcons : [...parentsIcons].reverse();
    removeSmothly(...arr);
  });
});
document.querySelectorAll(".icon-about").forEach((iconBtn) => {
  iconBtn.addEventListener("mousemove", ({ clientX, clientY }) => {
    const x = clientX - iconBtn.getBoundingClientRect().left;
    const y = clientY - iconBtn.getBoundingClientRect().top;
    iconBtn.style.setProperty("--x", `${x}px`);
    iconBtn.style.setProperty("--y", `${y}px`);
  });
  iconBtn.addEventListener("mouseout", () => {
    iconBtn.style.setProperty("--x", `0px`);
    iconBtn.style.setProperty("--y", `0px`);
  });
});
//first child hobbies
// ------------ btn copy email ------------
const canvasBombCard = document.querySelector("canvas.boomb");
document.querySelector(".copy-email .btn").addEventListener("click", (e) => {
  if (isClicked) return;
  canvasBombCard.classList.add("be-over");
  const conefetti = new Confetti(canvasBombCard, 90);
  conefetti.animate();
  isClicked = true;
  navigator.clipboard.writeText("ettalbimohamed77@gmail.com");
  removeSmothlyEmailBtn(...e.currentTarget.children).then((res) => {
    console.log(res);
    canvasBombCard.classList.remove("be-over");
  });
});
// ------------ Projects Cards Mouse Over ------------
const cards = document.querySelectorAll(".projects-container .card");
cards.forEach((card) => {
  card.addEventListener("mousemove", ({ clientX, clientY }) => {
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
  card.addEventListener("mouseout", () => {
    card.style.setProperty("--x", `0px`);
    card.style.setProperty("--y", `0px`);
  });
});
// ------------------ Scroll Animation ------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show-smothly", entry.isIntersecting);
    });
  },
  {
    rootMargin: "16px",
  }
);
const scrollAnimation = (arr) => {
  arr.forEach((elm) => observer.observe(elm));
};
scrollAnimation([
  ...cards,
  ...document.querySelectorAll(".container-contact > *"),
  ...document.querySelectorAll(".container-about > *"),
  ...document.querySelectorAll(".has-title"),
]);
// --------------- transform Image To Pixel Art  ---------------
const canvasContact = document.querySelector(".canvas-contact");
let transformImgToSymbols;
const image = new Image();
image.src = "./male.png";
// Throttle function for better performance
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
image.addEventListener("load", () => {
  transformImgToSymbols = new AsciiArt(canvasContact, image, 2);
  transformImgToSymbols.animate();
  const canvasObserver = new IntersectionObserver(
    throttle((entries) => {
      entries.forEach((entry) => {
        const canvas = entry.target;
        const ctx = canvas.getContext("2d");
        if (entry.isIntersecting) transformImgToSymbols.reset();
        else {
          transformImgToSymbols.notStoped = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    }, 200)
  );
  canvasObserver.observe(canvasContact);
});