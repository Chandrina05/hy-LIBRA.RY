// toggle class active
const navbarNav = document.querySelector(' .navbar-nav ');
// ketika menu di klik
document.querySelector('#menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// klik di luar side bbar untuk menghilangkan nav
const menu = document.querySelector('#menu');
document.addEventListener('click', function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});

// dark mode toggle

// document.querySelector('.dark-mode-switch').onclick = () => {
//   document.querySelector('body').classList.toggle('dark');
//   document.querySelector('body').classList.toggle('light');
// };

// // CHEK LEAP YEAR
// isLeapYear = (year) => {
//   return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
// };

// getFebDays = (year) => {
//   return isLeapYear(year) ? 29 : 28;
// };
// let calendar = document.querySelector('.calendar');

// const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// let month_picker = document.querySelector('#month-picker');

// month_picker.onclick = () => {
//   month_list.classList.add('show');
// };
// // Generate Calendar
// generateCalendar = (month, year) => {
//   let calendar_days = document.querySelector('.calendar-days');

//   let calendar_header_year = document.querySelector('#year');
//   calendar_days.innerHTML = '';
//   let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//   let currDate = new Date();

//   month_picker.innerHTML = month_names[month];
//   calendar_header_year.innerHTML = year;

//   let first_day = new Date(month, year, 1);

//   for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
//     let day = document.createElement('div');
//     if (i >= first_day.getDay()) {
//       day.classList.add('calendar-day-hover');
//       day.innerHTML = i - first_day.getDay() + 1;
//       day.innerHTML += `<span></span>
//                       <span></span>
//                       <span></span>
//                       <span></span>`;
//       if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
//         day.classList.add('curr-date');
//       }
//     }
//     calendar_days.appendChild(day);
//   }
// };

// let month_list = calendar.querySelector('.month-list');

// month_names.forEach((e, index) => {
//   let month = document.createElement('div');
//   month.innerHTML = `<div>${e}</div>`;
//   month.onclick = () => {
//     month_list.classList.remove('show');
//     curr_month.value = index;
//     generateCalendar(curr_month.value, curr_year.value);
//   };
//   month_list.appendChild(month);
// });

// document.querySelector('#prev-year').onclick = () => {
//   --curr_year.value;
//   generateCalendar(curr_month.value, curr_year.value);
// };
// document.querySelector('#next-year').onclick = () => {
//   ++curr_year.value;
//   generateCalendar(curr_month.value, curr_year.value);
// };

// let currDate = new Date();

// let curr_month = { value: currDate.getMonth() };
// let curr_year = { value: currDate.getFullYear() };

// generateCalendar(curr_month.value, curr_year.value);

// Carousel start
const initSlider = () => {
  const imageList = document.querySelector('.slider-wrapper .image-list');
  const slideButtons = document.querySelectorAll('.slider-wrapper .slide-button');
  const sliderScrollbar = document.querySelector('.container .slider-scrollbar');
  const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb');
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener('mousedown', (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    // Upadate thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // add event listeners for drag interaction
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });

  slideButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.id === 'prev-slide' ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });

  const handlesSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'block';
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? 'none' : 'block';
  };
  //  Update Scrollbar Thumb Position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  imageList.addEventListener('scroll', () => {
    handlesSlideButtons();
    updateScrollThumbPosition();
  });
};

window.addEventListener('load', initSlider);
