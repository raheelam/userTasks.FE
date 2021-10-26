export const toggleModal = (modalId) => {
  let modal = document.querySelector(`#${modalId}`);
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
};
