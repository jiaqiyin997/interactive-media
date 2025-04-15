import { works } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    autoRaf: true,
  });

  const worksListContainer = document.querySelector(".works-list");
  const workPreview = document.querySelector(".work-preview");
  const worksList = document.querySelector(".works-list");

  // const POSITIONS = {
  //   BOTTOM: 0,
  //   MIDDLE: -80,
  //   TOP: -160,
  // };

  const POSITIONS = {
    BOTTOM: 0,     
    MIDDLE: -50,   
    TOP: -100      
  };
  
  let lastMousePosition = { x: 0, y: 0 };
  let activeWork = null;
  let ticking = false;
  let mouseTimeout = null;
  let isMouseMoving = false;

  works.forEach((work) => {
    const workElement = document.createElement("div");
    workElement.className = "work";

    workElement.innerHTML = `
      <div class='work-wrapper'>
        <div class='work-name'>
          <h1>${work.name}</h1>
          <h1>${work.type}</h1>
        </div>
        <div class="work-project">
          <h1>${work.project}</h1>
          <h1>${work.label}</h1>
        </div>
        <div class='work-name'>
          <h1>${work.name}</h1>
          <h1>${work.type}</h1>
        </div>
      </div>
    `;

    workElement.addEventListener("click", () => {    
      window.location.href = work.link; 
      worksListContainer.appendChild(workElement);
    });

    const worksElements = document.querySelectorAll(".work");

    const animatePreview = () => {
      const worksListRect = worksList.getBoundingClientRect();
      if (
        lastMousePosition.x < worksListRect.left ||
        lastMousePosition.x > worksListRect.right ||
        lastMousePosition.y < worksListRect.top ||
        lastMousePosition.y > worksListRect.bottom
      ) {
        const previewImages = workPreview.querySelectorAll("img");
        previewImages.forEach((img) => {
          gsap.to(img, {
            scale: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => img.remove(),
          });
        });
      }
    };

    const updateWorks = () => {
      animatePreview();

      if (activeWork) {
        const rect = activeWork.getBoundingClientRect();
        const isStillOver =
          lastMousePosition.x >= rect.left &&
          lastMousePosition.x <= rect.right &&
          lastMousePosition.y >= rect.top &&
          lastMousePosition.y <= rect.bottom;

        if (!isStillOver) {
          const wrapper = activeWork.querySelector(".work-wrapper");
          const leavingFromTop = lastMousePosition.y < rect.top + rect.height / 2;

          gsap.to(wrapper, {
            y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
            duration: 0.4,
            ease: "power2.out",
          });
          activeWork = null;
        }
      }

      worksElements.forEach((work, index) => {
        if (work === activeWork) return;

        const rect = work.getBoundingClientRect();
        const isMouseOver =
          lastMousePosition.x >= rect.left &&
          lastMousePosition.x <= rect.right &&
          lastMousePosition.y >= rect.top &&
          lastMousePosition.y <= rect.bottom;

        if (isMouseOver) {
          const wrapper = work.querySelector(".work-wrapper");
          const enterFromTop = lastMousePosition.y < rect.top + rect.height / 2;

          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: "power2.out",
          });
          activeWork = work;
        }
      });

      ticking = false;
    };

    document.addEventListener("mousemove", (e) => {
      lastMousePosition.x = e.clientX;
      lastMousePosition.y = e.clientY;

      isMouseMoving = true;
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }

      const worksListRect = worksList.getBoundingClientRect();
      const isInsideWorksList =
        lastMousePosition.x >= worksListRect.left &&
        lastMousePosition.x <= worksListRect.right &&
        lastMousePosition.y >= worksListRect.top &&
        lastMousePosition.y <= worksListRect.bottom;

      if (isInsideWorksList) {
        mouseTimeout = setTimeout(() => {
          isMouseMoving = false;
          const images = workPreview.querySelectorAll("img");
          if (images.length > 1) {
            const lastImage = images[images.length - 1];
            images.forEach((img) => {
              if (img !== lastImage) {
                gsap.to(img, {
                  scale: 0,
                  duration: 0.4,
                  ease: "power2.out",
                  onComplete: () => img.remove(),
                });
              }
            });
          }
        }, 2000);
      }

      animatePreview();
    });

    document.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateWorks();
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    worksElements.forEach((work, index) => {
      const wrapper = work.querySelector(".work-wrapper");
      let currentPosition = POSITIONS.TOP;

      work.addEventListener("mouseenter", (e) => {
        activeWork = work;
        const rect = work.getBoundingClientRect();
        const enterFromTop = lastMousePosition.y < rect.top + rect.height / 2;

        if (enterFromTop || currentPosition === POSITIONS.BOTTOM) {
          currentPosition = POSITIONS.MIDDLE;
          gsap.to(wrapper, {
            y: POSITIONS.MIDDLE,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        const img = document.createElement("img");
        img.src = `./images/img${index + 1}.jpg`;
        img.style.position = "absolute";
        img.style.top = "0";
        img.style.left = "0";
        img.style.scale = 0;
        img.style.zIndex = Date.now();

        workPreview.appendChild(img);

        gsap.to(img, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      work.addEventListener("mouseleave", (e) => {
        activeWork = null;
        const rect = work.getBoundingClientRect();
        const leavingFromTop = e.clientY < rect.top + rect.height / 2;

        currentPosition = leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM;
        gsap.to(wrapper, {
          y: currentPosition,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });
  });
});
