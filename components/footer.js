(function () { 
  "use strict"; 
  function renderFooter() { 
  return  `
  <footer class="nova-footer"> 
  <div class="nova-footer-inner"> 
  
      <div> 
      <strong>نوا | خدمات هوشمند</strong>
      <p>راهکاری ساده برای دسترسی و مدیریت خدمات آنلاین.</p> 
      </div> 

      <div class="nova-footer-links"> 
      <a href="#home" data-page="home">صفحه اصلی</a>
      <a href="#services" data-page="services">خدمات</a>
      <a href="#contact" data-page="contact">تماس با ما</a> 
      </div>  

      <small>© تمامی حقوق برای سامانه نوا محفوظ است.</small>
  </div> 
  </footer> 
`; } 
window.renderFooter = renderFooter; 
})();