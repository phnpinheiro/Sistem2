/* Sistem2 Informática — main.js */

/* Valores a customizar */
const SISTEM2 = {
  whatsapp: "5537999811762",            // [CONFIRMAR] número do comercial com DDI+DDD, só dígitos
  email: "comercial@sistem2.com.br"
};

(function () {
  "use strict";

  /* Menu mobile */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 981px)").addEventListener("change", () => setOpen(false));
  }

  /* Ano do rodapé */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* Links de WhatsApp com número centralizado */
  document.querySelectorAll("[data-whatsapp]").forEach((a) => {
    const msg = a.getAttribute("data-whatsapp") || "Olá! Vim pelo site da Sistem2 e gostaria de falar com o comercial.";
    a.href = "https://wa.me/" + SISTEM2.whatsapp + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* Formulário de contato: abre WhatsApp ou e-mail com a mensagem montada */
  const form = document.getElementById("contact-form");
  if (form) {
    const status = document.getElementById("form-status");
    const buildText = () => {
      const d = new FormData(form);
      return [
        "Olá! Vim pelo site da Sistem2.",
        "Nome: " + (d.get("nome") || "").toString().trim(),
        "Empresa: " + (d.get("empresa") || "").toString().trim(),
        "Telefone: " + (d.get("telefone") || "").toString().trim(),
        "Interesse: " + (d.get("interesse") || "").toString().trim(),
        "",
        (d.get("mensagem") || "").toString().trim()
      ].join("\n");
    };
    const send = (channel) => {
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Preencha os campos obrigatórios para continuar.";
        return;
      }
      status.textContent = "";
      const text = buildText();
      if (channel === "whatsapp") {
        window.open("https://wa.me/" + SISTEM2.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      } else {
        window.location.href = "mailto:" + SISTEM2.email + "?subject=" + encodeURIComponent("Contato pelo site — " + (new FormData(form).get("interesse") || "")) + "&body=" + encodeURIComponent(text);
      }
    };
    form.addEventListener("submit", (e) => { e.preventDefault(); send("whatsapp"); });
    const mailBtn = document.getElementById("send-email");
    if (mailBtn) mailBtn.addEventListener("click", () => send("email"));
  }
})();
