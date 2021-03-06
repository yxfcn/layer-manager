import Promise from 'bluebird';

Promise.config({ cancellation: true });

/**
 * Fetch using method GET
 * @param {String} url
 */
export const get = url => new Promise((resolve, reject, onCancel) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener('load', () => resolve(xhr));
  xhr.addEventListener('error', reject);
  xhr.send(null);
  // Note the onCancel argument only exists if cancellation has been enabled!
  onCancel(() => xhr.abort());
});

/**
 * Fetch using method POST
 * @param {String} url
 * @param {Object} params
 */
export const post = (url, params) =>
  new Promise((resolve, reject, onCancel) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', () => resolve(xhr));
    xhr.addEventListener('error', reject);
    xhr.send(JSON.stringify(params));
    // Note the onCancel argument only exists if cancellation has been enabled!
    onCancel(() => xhr.abort());
  });

export default { get, post };
