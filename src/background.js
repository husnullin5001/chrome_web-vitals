const data = {};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'perfomance:metric') {
    const tab = sender.tab.url.toString();
    data[tab] = data[tab] || {};
    const name = request.name;
    data[tab][name] = data[tab][name] || {
      values: [],
      average: 0,
    };
    data[tab][name].values.push(request.value);
    data[tab][name].average =
      data[tab][name].values.reduce((a, v) => a + v, 0) /
      data[tab][name].values.length;
  } else if (request.type === 'perfomance:metric:request') {
    sendResponse(data);
  }
});
