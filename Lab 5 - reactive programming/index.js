const MyLibrary = (function() {
  function logger(data) {
    console.log(data);
  }

  return {
    interval(callback) {
      let timer = 1;
      setInterval(() => {
        callback(timer);
        timer++;
      }, 2000);
    },

    saveCToSessionStorage(data) {
      console.log('[reader C]', data);
      const storageData = { data };
      sessionStorage.setItem('C', JSON.stringify(storageData));
      logger(`[log from C] ${data}`);
    },

    discoverPowerBallNumber(data) {
      const number = Math.floor(Math.random() * data * 100);
      console.log('[powerball number]', number);
    }
  };
})();

MyLibrary.interval((timer) => {
  MyLibrary.saveCToSessionStorage(timer);
  MyLibrary.discoverPowerBallNumber(timer);
});
