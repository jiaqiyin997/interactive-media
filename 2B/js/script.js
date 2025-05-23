

// Chatgpt was used in the building of this. I made refinements and adjusted the code where necessary.

// In the instance of AI writing entire code blocks which I did not modify, I sought to understand the process behind them.
import { awards } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    autoRaf: true,
  });

  const awardsListContainer = document.querySelector(".awards-list");
  const awardPreview = document.querySelector(".award-preview");
  const awardsList = document.querySelector(".awards-list");

  // const POSITIONS = {
  //   BOTTOM: 0,
  //   MIDDLE: -80,
  //   TOP: -160,
  // };

  const POSITIONS = {
    BOTTOM: 0,     // 显示第一部分
    MIDDLE: -50,   // 显示中间（奖项项目部分）
    TOP: -100      // 显示第三部分（复制的 award-name）
  }
  

  let lastMousePosition = { x: 0, y: 0 };
  let activeAward = null;
  let ticking = false;
  let mouseTimeout = null;
  let isMouseMoving = false;

  awards.forEach((award) => {
    const awardElement = document.createElement("div");
    awardElement.className = "award";

    awardElement.innerHTML = `
      <div class='award-wrapper'>
        <div class='award-name'>
          <h1>${award.name}</h1>
          <h1>${award.type}</h1>
        </div>
        <div class="award-project">
          <h1>${award.project}</h1>
          <h1>${award.label}</h1>
        </div>
        <div class='award-name'>
          <h1>${award.name}</h1>
          <h1>${award.type}</h1>
        </div>
      </div>
    `;

    // 绑定点击事件，根据需要选择同页跳转或者新标签页打开
  awardElement.addEventListener("click", () => {
    // 1) 在同一个标签页中跳转
    window.location.href = award.link; 

    // 或者
    // 2) 在新标签页中打开
    // window.open(award.link, "_blank");
  });

    awardsListContainer.appendChild(awardElement);
  });

  const awardsElements = document.querySelectorAll(".award");

  const animatePreview = () => {
    const awardsListRect = awardsList.getBoundingClientRect();
    if (
      lastMousePosition.x < awardsListRect.left ||
      lastMousePosition.x > awardsListRect.right ||
      lastMousePosition.y < awardsListRect.top ||
      lastMousePosition.y > awardsListRect.bottom
    ) {
      const previewImages = awardPreview.querySelectorAll("img");
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

  const updateAwards = () => {
    animatePreview();

    if (activeAward) {
      const rect = activeAward.getBoundingClientRect();
      const isStillOver =
        lastMousePosition.x >= rect.left &&
        lastMousePosition.x <= rect.right &&
        lastMousePosition.y >= rect.top &&
        lastMousePosition.y <= rect.bottom;

      if (!isStillOver) {
        const wrapper = activeAward.querySelector(".award-wrapper");
        const leavingFronTop = lastMousePosition.y < rect.top + rect.height / 2;

        gsap.to(wrapper, {
          y: leavingFronTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
          duration: 0.4,
          ease: "power2.out",
        });
        activeAward = null;
      }
    }

    awardsElements.forEach((award, index) => {
      if (award === activeAward) return;

      const rect = award.getBoundingClientRect();
      const isMouseOver =
        lastMousePosition.x >= rect.left &&
        lastMousePosition.x <= rect.right &&
        lastMousePosition.y >= rect.top &&
        lastMousePosition.y <= rect.bottom;

      if (isMouseOver) {
        const wrapper = award.querySelector(".award-wrapper");
        const enterFromTop = lastMousePosition.y < rect.top + rect.height / 2;

        gsap.to(wrapper, {
          y: POSITIONS.MIDDLE,
          duration: 0.4,
          ease: "power2.out",
        });
        activeAward = award;
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

    const awardsListRect = awardsList.getBoundingClientRect();
    const isInsideAwardsList =
      lastMousePosition.x >= awardsListRect.left &&
      lastMousePosition.x <= awardsListRect.right &&
      lastMousePosition.y >= awardsListRect.top &&
      lastMousePosition.y <= awardsListRect.bottom;

    if (isInsideAwardsList) {
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
        const images = awardPreview.querySelectorAll("img");
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
          updateAwards();
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  awardsElements.forEach((award, index) => {
    const wrapper = award.querySelector(".award-wrapper");
    let currentPosition = POSITIONS.TOP;

    award.addEventListener("mouseenter", (e) => {
      activeAward = award;
      const rect = award.getBoundingClientRect();
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

      awardPreview.appendChild(img);

      gsap.to(img, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    award.addEventListener("mouseleave", (e) => {
      activeAward = null;
      const rect = award.getBoundingClientRect();
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
