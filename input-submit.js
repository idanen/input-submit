const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  </style>
  <input type="text" placeholder="Insert some input" />
  <button>Submit</button>
`;

class InputSubmit extends HTMLElement {
  constructor() {
    super();

    this.root = this.createShadowRoot();
    this.root.appendChild(template.content.cloneNode(true));
    this.input = this.root.querySelector('input');
    this.button = this.root.querySelector('button');

    this.onSubmit = this.onSubmit.bind(this);
  }

  connectedCallback() {
    this.button.addEventListener('click', this.onSubmit, { capture: true });
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.onSubmit, { capture: true });
  }

  onSubmit(event) {
    const submittedEvent = new CustomEvent('submitted-event', {
      bubbles: true,
      cancelable: true,
      detail: { value: this.input.value }
    });
    this.dispatchEvent(submittedEvent);
  }
}

window.customElements.define('input-submit', InputSubmit);
