import swal from 'sweetalert';
const refs = {
  datepicker: document.querySelector('.datepicker'),
  stopBtn: document.querySelector('[data-action="stop"]'),
  startBtn: document.querySelector('[data-action="start"]'),
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
    constructor({ selector, targetDate, onTick, enableInterface, disableInterface }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
        this.enableInterface = enableInterface;
        this.disableInterface = disableInterface;
        this.checkDate(); 
    }
    checkDate() {
        const date = localStorage.getItem('date');

        if (date) {
            this.start();
            refs.datepicker.value = date.slice(0, 15);
        }

    }
    start() {
    this.isActive = true;
    this.disableInterface(); 
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const startTime = this.targetDate;
      const deltaTime = startTime - currentTime;
      const timeComponents = this.getTimeComponents(deltaTime);

      this.onTick(timeComponents);
    }, 1000);
  }

  stop() {
    this.isActive = false;
    clearInterval(this.intervalId);
    localStorage.clear();
    refs.datepicker.placeholder = 'Do it!';
    this.onTick({}); 
    this.enableInterface(); 
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(localStorage.getItem('date')),
  onTick: updateInterface,
  disableInterface: disableInterface,
  enableInterface: enableInterface,
});

function updateInterface({ days = '00', hours = '00', mins = '00', secs = '00' }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}


function disableInterface() {
  refs.datepicker.setAttribute('disabled', 'disabled');
  refs.startBtn.setAttribute('disabled', 'disabled');
}


function enableInterface() {
  refs.datepicker.removeAttribute('disabled');
  refs.startBtn.removeAttribute('disabled');
}

function onSelectDate() {
  timer.targetDate = new Date(refs.datepicker.value); // Установка даты

  
  if (Date.now() > timer.targetDate) {
    timer.stop();

    
    swal({
      text: 'Sorry, try again!',
    });
  } else if (refs.datepicker.value) {
    timer.start();

    localStorage.setItem('date', timer.targetDate); 

  }
}

refs.stopBtn.addEventListener('click', () => {
  if (!timer.isActive) {
    return;
  }

  timer.stop();
});

refs.startBtn.addEventListener('click', onSelectDate);