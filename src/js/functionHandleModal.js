export default function handleModal(event) {
  if (event.target.nodeName != 'BUTTON') {
    return;
  }
  return event.target.dataset.id;
}
