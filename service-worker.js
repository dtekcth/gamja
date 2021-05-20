self.addEventListener("push", (event) => {
	var payload = event.data ? event.data.text() : "no payload";
	event.waitUntil(self.registration.showNotification("gamja service worker", {
		body: payload,
	}));
});
