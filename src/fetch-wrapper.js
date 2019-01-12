export function post(url, data) {
  return window
    .fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      if (res.status === 200) {
        return res.json();
      }
    });
}
