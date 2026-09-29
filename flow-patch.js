// تحسين الانتقال بين الألغاز
(() => {
  const hideClue = () => {
    const cm = document.querySelector('#cm');
    if (cm) {
      cm.style.visibility = 'hidden';
      cm.style.pointerEvents = 'none';
    }
  };

  const restoreClue = () => {
    const cm = document.querySelector('#cm');
    if (cm) {
      cm.style.visibility = '';
      cm.style.pointerEvents = '';
    }
  };

  const openBodyLanguageRiddle = () => {
    const sc = document.querySelector('#sc');
    if (!sc) return;
    const scene = sc.querySelector('#cur');
    const sentence = sc.querySelector('[data-a="sent"]');
    const body = sc.querySelector('[data-a="body"]');
    if (!scene || !sentence || !body || scene.dataset.bodyPuzzleOpened === '1') return;

    scene.dataset.bodyPuzzleOpened = '1';
    hideClue();
    sentence.click();
    body.click();

    const wait = setInterval(() => {
      const pz = document.querySelector('#pz');
      if (pz && pz.classList.contains('on')) {
        clearInterval(wait);
        restoreClue();
      }
    }, 30);

    setTimeout(() => {
      clearInterval(wait);
      restoreClue();
    }, 3500);
  };

  const observer = new MutationObserver(openBodyLanguageRiddle);
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(openBodyLanguageRiddle, 50);
})();
