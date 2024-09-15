// Simple service worker that doesnt really do anything other than allowing me to
// download the app from the server

self.addEventListener('install', event => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
});


self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return new Response('Network error occurred');
        })
    );
});
