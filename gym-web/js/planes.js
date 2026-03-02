export function setupPlanModal() {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const closeModal = document.getElementById("closeModal");
  const buttons = document.querySelectorAll(".btn-plan");

  if (!modal || !modalTitle || !closeModal || buttons.length === 0) return;

  const resetButtons = () => {
    buttons.forEach((btn) => {
      btn.disabled = false;
      btn.textContent = "Contratar";
    });
  };

  const openModal = (plan) => {

    modalTitle.textContent =
      `Plan ${plan} contratado.\n` +
      `Gracias por su compra.\n` +
      `Se le han enviado las instrucciones de pago a su correo.`;

    modal.classList.add("show");

   
    buttons.forEach((btn) => (btn.disabled = true));
  };

  const close = () => {
    modal.classList.remove("show");
    resetButtons();
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan || "Plan";

      // feedback en el botón clickeado
      button.textContent = "Procesando...";

      openModal(plan);
    });
  });

  closeModal.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close(); 
  });
}