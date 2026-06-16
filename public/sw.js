self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch((err) => {
      // Faqatgina asosiy sahifaga kirayotganda uzilish bo'lsa xabar berish
      if (e.request.mode === 'navigate') {
        return new Response('<h2 style="text-align:center; margin-top:50px; font-family:sans-serif;">Tarmoqqa ulanish yo`q. Offline rejimdasiz.</h2>', { 
          headers: { 'Content-Type': 'text/html' } 
        });
      }
      throw err;
    })
  );
});