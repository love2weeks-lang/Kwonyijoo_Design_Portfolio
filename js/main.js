import { createEyeBlink } from './eyeBlink.js';
import { createBattery } from './battery.js';
import { revealTitle } from './titleReveal.js';
import { initScrollDown } from './scrollDown.js';
import { initProfileReveal } from './profileReveal.js';

// 인터랙션별 on/off
const INTERACTIONS = {
  eyeBlink: true,
  battery: true,
  titleReveal: true,
  scrollDown: true,
  profileReveal: true,
};

const cover = document.querySelector('.cover');

// 모든 이미지 프레임을 디코딩까지 끝낸 뒤 시작 (첫 교체 시 깜빡임 방지)
function preloadImages(root) {
  const images = Array.from(root.querySelectorAll('img'));
  return Promise.all(images.map((img) => img.decode().catch(() => {})));
}

preloadImages(cover).then(() => {
  const title = cover.querySelector('[data-title-reveal]');
  if (INTERACTIONS.titleReveal) revealTitle(title);
  else title.classList.add('is-shown');

  if (INTERACTIONS.eyeBlink) createEyeBlink(cover.querySelector('[data-eye-blink]')).start();
  if (INTERACTIONS.battery) createBattery(cover.querySelector('[data-battery]')).start();
});

if (INTERACTIONS.scrollDown) initScrollDown(cover.querySelector('[data-scroll-down]'));

const profile = document.querySelector('[data-profile-reveal]');
if (INTERACTIONS.profileReveal) initProfileReveal(profile);
else profile.classList.add('is-revealed');
