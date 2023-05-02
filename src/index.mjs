import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

// Initialize htm with Preact
const html = htm.bind(h);

function App(props) {
  return html`
    <div>
      ${props.cpus.map((cpu) => {
    return html`<div className="bar">${cpu.toFixed(2)}% usage</div>`;
  })
    }
    </div>
  `;
}

setInterval(async () => {
  let response = await fetch("/api/cpus");
  if (response.status !== 200) {
    throw new Error(`HTTP error! Status: ${response.status} `);
  }

  let json = await response.json();
  render(html`<${App} cpus=${json} />`, document.body);
}, 1000);