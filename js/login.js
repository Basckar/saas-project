(() => {
  const form = document.getElementById("login-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const phone = form.elements.phone.value.trim();
    const password = form.elements.password.value;
    if (!phone || password.length < 4) {
      window.novaToast?.("لطفاً شماره موبایل و رمز عبور معتبر وارد کنید.");
      return;
    }
    // نسخه نمایشی: در پروژه واقعی اعتبارسنجی باید از طریق API انجام شود.
    NovaStorage.setUser({ phone, name: "کاربر نام سایت", loggedIn: true });
    window.novaToast?.("ورود نمایشی با موفقیت انجام شد.");
    const modal = document.getElementById("login-modal");
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 450);
  });
})();
