
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const closeModal = document.getElementById("closeModal");

const buttons = document.querySelectorAll(".btn-plan");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;

    modalTitle.textContent = `Plan ${plan} contratado`;
    modal.classList.add("show");

    button.disabled = true;
    button.textContent = "Procesando...";
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");

  buttons.forEach(btn => {
    btn.disabled = false;
    btn.textContent = "Contratar";
  });
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});