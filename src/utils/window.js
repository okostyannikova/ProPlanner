import debounce from 'lodash.debounce';

const getDevice = width => {
  let device;
  if (width >= 1200) {
    device = 'lg';
  } else if (width >= 992) {
    device = 'md';
  } else if (width >= 768) {
    device = 'sm';
  } else {
    device = 'xs';
  }
  return device;
};

const checkWidth = debounce(() => {
  const currentWidth = document.documentElement.clientWidth;
  console.log(getDevice(currentWidth));
}, 300);

checkWidth();

window.addEventListener('resize', checkWidth);
