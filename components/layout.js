(function () {
  "use strict";

  function renderLayout() {
    const headerElement = document.getElementById("site-header");
    const footerElement = document.getElementById("site-footer");

    // نمایش هدر مشترک
    if (headerElement && typeof window.renderHeader === "function") {
      headerElement.innerHTML = window.renderHeader();
    }

    // نمایش فوتر مشترک
    if (footerElement && typeof window.renderFooter === "function") {
      footerElement.innerHTML = window.renderFooter();
    }
  }

  // اجرای ساختار مشترک بعد از بارگذاری صفحه
  document.addEventListener("DOMContentLoaded", renderLayout);

  // امکان اجرای مجدد در صورت نیاز
  window.NovaLayout = {
    render: renderLayout,
  };
})();
