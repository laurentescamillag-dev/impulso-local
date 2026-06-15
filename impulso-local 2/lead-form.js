const leadDialog = document.querySelector("#leadDialog");
const leadForm = document.querySelector("#leadForm");
const openLeadButtons = document.querySelectorAll("[data-lead-form]");
const closeLeadButtons = document.querySelectorAll("[data-close-form]");
const whatsappNumber = "522225385492";

const openLeadForm = () => {
  if (typeof leadDialog.showModal === "function") {
    leadDialog.showModal();
  } else {
    leadDialog.setAttribute("open", "");
  }
  leadForm.querySelector("input, select")?.focus();
};

const closeLeadForm = () => {
  leadDialog.close();
};

openLeadButtons.forEach((button) => {
  button.addEventListener("click", openLeadForm);
});

closeLeadButtons.forEach((button) => {
  button.addEventListener("click", closeLeadForm);
});

leadDialog.addEventListener("click", (event) => {
  if (event.target === leadDialog) {
    closeLeadForm();
  }
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!leadForm.reportValidity()) {
    return;
  }

  const data = new FormData(leadForm);
  const value = (field) => String(data.get(field) || "").trim();
  const link = value("link") || "No compartido";

  const message = [
    "Hola, quiero un diagnóstico digital para mi negocio.",
    "",
    `Nombre: ${value("nombre")}`,
    `Negocio: ${value("negocio")}`,
    `Giro: ${value("giro")}`,
    `Ciudad: ${value("ciudad")}`,
    `Quiero mejorar: ${value("objetivo")}`,
    `Presupuesto diario para anuncios: ${value("presupuesto")}`,
    `Redes o sitio web: ${link}`,
  ].join("\n");

  window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
});
