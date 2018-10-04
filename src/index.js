import './scss/style.scss';
import MobileDetect from 'mobile-detect';

//базовые классы
const arrClassNames = [
  'product__border',
  'product__weight',
  'product__text-after-link',
  'product__text-after-point'
];

const HeightMiddle = () => {
  const clientHeight = document.documentElement.clientHeight;
  const mainBlock_Height = document.querySelector('.main').clientHeight;
  const mainCatFood = document.querySelector('.main__cat-food');

  if (mainBlock_Height <= clientHeight) {
    const margin = Math.floor((clientHeight - mainCatFood.clientHeight) / 2);

    mainCatFood.style.marginTop = margin + 'px';
  } else {
    mainCatFood.style.marginTop = '';
  }
};

const CheckProduct = event => {
  //Блок не поддерживает возможность выбора
  if (
    event.currentTarget.querySelector('.product__disabled') ||
    //не поддерживает IE 11
    // !event.target.classList.contains('js-productChecker')
    //для IE 11
    event.target.className === 'product__text-after' ||
    event.target.className === 'product__text-after-point' ||
    event.target.className ===
      'product__text-after-point product__text-after-point-hover'
  ) {
    return;
  }

  const productLabel = event.currentTarget.querySelector('.product');
  const arrTextAfter = event.currentTarget.querySelectorAll(
    '.product__text-after'
  );

  //для IE 11
  const classList = productLabel.className.split(' ');
  if (classList.indexOf('product__checked') !== -1) {
    productLabel.className = 'product';
    arrTextAfter[0].className = 'product__text-after';
    arrTextAfter[1].className = 'product__text-after hideBlock';

    AddClass(productLabel.parentNode, 'default', 2);
  } else {
    productLabel.className = 'product product__checked';
    arrTextAfter[0].className = 'product__text-after hideBlock';
    arrTextAfter[1].className = 'product__text-after';

    AddClass(productLabel.parentNode, 'checked', 2);
  }
  //не поддерживает IE 11
  // if (productLabel.classList.contains('product__checked')) {
  //   productLabel.classList.remove('product__checked');
  //   for (let i = 0; i < arrTextAfter.length; i++) {
  //     arrTextAfter[i].classList.toggle('hideBlock');
  //   }
  // } else {
  //   productLabel.classList.add('product__checked');
  //   for (let i = 0; i < arrTextAfter.length; i++) {
  //     arrTextAfter[i].classList.toggle('hideBlock');
  //   }
  // }
};

const HoverProduct = event => {
  const productLabel = event.currentTarget;

  //У блока нет ховера
  if (
    productLabel.parentNode.querySelector('.product__disabled') ||
    //не поддерживает IE 11
    // !event.target.classList.contains('js-productChecker')
    //для IE 11
    event.target.className === 'product__text-after' ||
    event.target.className === 'product__text-after-point' ||
    event.target.className ===
      'product__text-after-point product__text-after-point-hover'
  ) {
    return;
  }

  const classList = productLabel.className.split(' ');
  if (classList.indexOf('product__checked') !== -1) {
    AddClass(productLabel.parentNode, 'checked-hover', 2);

    setTimeout(() => {
      AddClass(productLabel.parentNode, 'checked', 2);
    }, 500);
  } else {
    AddClass(productLabel.parentNode, 'hover', 4);

    setTimeout(() => {
      AddClass(productLabel.parentNode, 'default', 4);
    }, 500);
  }
};

const FixDisabled = () => {
  const product = document.querySelectorAll('.product');

  for (let i = 0; i < product.length; i++) {
    if (product[i].classList.contains('product__disabled')) {
      document.getElementById(product[i].htmlFor).disabled = true;

      const arrTextAfter = product[i].parentNode.querySelectorAll(
        '.product__text-after'
      );
      arrTextAfter[0].className = 'product__text-after hideBlock';
      arrTextAfter[1].className = 'product__text-after hideBlock';

      const productStuff = product[i].querySelector('.product__header-after')
        .textContent;

      const newTextAfter = document.createElement('div');
      newTextAfter.innerHTML = 'Печалька, ' + productStuff + ' закончился.';
      newTextAfter.className = 'product__text-after-disabled';
      product[i].parentNode.appendChild(newTextAfter);

      AddClass(product[i].parentNode, 'disabled', 2);
    }
  }
};

const FixChecked = () => {
  const product = document.querySelectorAll('.product');

  for (let i = 0; i < product.length; i++) {
    if (product[i].classList.contains('product__checked')) {
      document.getElementById(product[i].htmlFor).checked = true;

      const arrTextAfter = product[i].parentNode.querySelectorAll(
        '.product__text-after'
      );
      arrTextAfter[0].className = 'product__text-after hideBlock';
      arrTextAfter[1].className = 'product__text-after';

      AddClass(product[i].parentNode, 'checked', 2);
    }
  }
};

const AddClass = (productParent, name, length) => {
  for (let i = 0; i < length; i++) {
    const newClassName = arrClassNames[i] + ' ' + arrClassNames[i] + '-' + name;
    const classTag = productParent.querySelector('.' + arrClassNames[i]);

    if (classTag.tagName === 'svg') {
      classTag.className.baseVal = newClassName;
    } else {
      classTag.className = newClassName;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  //Центрировать по вертикали блок с кошачьей едой
  HeightMiddle();

  //При изменении размеров окна обновлять центрирование
  window.addEventListener('resize', () => {
    HeightMiddle();
  });

  FixDisabled();
  FixChecked();

  const arrProductParent = document.querySelectorAll('.cat-food__product');

  for (let i = 0; i < arrProductParent.length; i++) {
    arrProductParent[i].addEventListener('click', CheckProduct);
  }

  const md = new MobileDetect(window.navigator.userAgent);

  //Если не мобильное устройство, то подключаем ховеры
  if (!md.mobile()) {
    const arrProduct = document.querySelectorAll('.product');

    for (let i = 0; i < arrProduct.length; i++) {
      arrProduct[i].addEventListener('mouseout', HoverProduct);
    }
  }
});
