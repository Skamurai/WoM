document.addEventListener("DOMContentLoaded", function () {
    const notificationTab = document.querySelector(".notification-tab");
    const counter = document.querySelector(".counter");
    const notificationsList = document.querySelector(".notifications-list");
  
    let notificationCount = 0;
    let debounceTimer;
    let allowNewNotifications = true;
  
    function addNotification() {
      if (allowNewNotifications) {
          const notificationItem = document.createElement("div");
          notificationItem.className = "notification-item";
          notificationItem.innerHTML = `
              <span class="notification-text">Новое уведомление #${notificationCount + 1}</span>
              <button class="close-button">X</button>
          `;
          notificationsList.prepend(notificationItem);
          notificationCount++;
          counter.textContent = notificationCount;
  
          const closeButton = notificationItem.querySelector(".close-button");
          closeButton.addEventListener("click", function () {
              notificationsList.removeChild(notificationItem);
              notificationCount--;
              counter.textContent = notificationCount;
          });
      }
  }
  
  
    function debounce(fn, delay) {
      return function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(fn, delay);
      };
    }
  
    function stopNotifications() {
      // Остановка счетчика на 10 секунд
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        counter.textContent = notificationCount;
        allowNewNotifications = true; // Разрешить новые уведомления после 10 секунд
      }, 10000);
    }
  
    function toggleNotifications() {
      notificationsList.classList.toggle("show");
      allowNewNotifications = false; // Запретить новые уведомления при открытии
      stopNotifications();
    }
  
    notificationTab.addEventListener("click", debounce(function () {
      toggleNotifications();
    }, 300));
  
    setInterval(addNotification, 3000);
  });
  