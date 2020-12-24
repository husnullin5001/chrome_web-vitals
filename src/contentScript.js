import { getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals';

const infoDiv = document.createElement('div');
infoDiv.style.position = 'fixed';
infoDiv.style.left = 0;
infoDiv.style.top = 0;
infoDiv.style.zIndex = 0;
infoDiv.style.backgroundColor = 'black';
infoDiv.style.color = 'white';
infoDiv.style.padding = '1rem';
infoDiv.style.fontFamily = 'Arial';
// document.body.append(infoDiv);

const metrics = {};
const gatherMetrics = ({ name, value }) => {
  metrics[name] = value;

  chrome.runtime.sendMessage({
    type: 'perfomance:metric',
    name,
    value
  });

  const metricsHTML = Object.keys(metrics)
    .map((k) => `<div>${k}</div><div>${Math.round(metrics[k])}</div>`)
    .join('');

  infoDiv.innerHTML = `
<div style="font-weight:bold; font-size:x-large">Perf Metrics</div>
<div style="display:grid; grid-template-columns: 1fr 1fr; grid-colunb-gap: 1rem;">
  <div>Metric</div>
  <div>Value</div>
  ${metricsHTML}
</div>
  `
}

getCLS(gatherMetrics);
getFID(gatherMetrics);
getLCP(gatherMetrics);
getTTFB(gatherMetrics);
getFCP(gatherMetrics);
