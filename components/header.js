function renderHeader() 
{
  return `
    <header class="site-header">
      <a class="brand" href="index.html">
        <span class="brand-mark">ن</span>
        <span>نام سایت<span class="brand-sub"> | خدمات هوشمند</span></span>
      </a>

      <nav class="main-nav">
        <a class="active" href="index.html">صفحه اصلی</a>
        <a href="#services">خدمات</a>
        <a href="#how">نحوه استفاده</a>
      </nav>

      <div class="header-actions">
        <a class="btn btn-ghost desktop-only" href="dashboard.html">
          پنل کاربری
        </a>

        <button class="btn btn-primary" type="button" data-open-login>
          ورود به حساب
        </button>

        <button
          class="menu-toggle"
          type="button"
          aria-label="باز کردن منو"
          aria-expanded="false"></button>
      </div>
    </header>
`;
}