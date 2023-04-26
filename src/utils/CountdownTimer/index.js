class CountdownTimer {
  constructor(callback, seconds) {
    this.callback = callback;
    this.seconds = seconds;
  }

  start() {
    this.interval = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        clearInterval(this.interval);
        this.callback();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
