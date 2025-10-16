const timeElement = document.querySelector('[data-testid="test-user-time"]');

function updateTime() {
  timeElement.textContent = `Current time: ${Date.now()} ms`;
}

updateTime();
setInterval(updateTime, 1000);
