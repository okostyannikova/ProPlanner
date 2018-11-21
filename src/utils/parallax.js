export const parallax = () => {
  const layer1 = document.querySelectorAll('.parallax-layer1');
  const layer2 = document.querySelector('.parallax-layer2');
  const container = document.querySelector('.home');
  const walk = 10;
  container.focus();

  const addParallax = ev => {
    const { offsetWidth: width, offsetHeight: height } = container;
    let { offsetX: x, offsetY: y } = ev;

    if (this !== ev.target) {
      x += ev.target.offsetLeft;
      y += ev.target.offsetTop;
    }

    const wWalk = Math.round((x / width) * walk - walk / 2);
    const hWalk = Math.round((y / height) * walk - walk / 2);

    layer2.style.transform = `translate(${wWalk}px, ${hWalk}px)`;

    for (let i = 0; i < layer1.length; i += 1) {
      layer1[i].style.transform = `translate(${wWalk * -1}px, ${hWalk * -1}px)`;
    }
  };

  container.addEventListener('mousemove', addParallax);
};
