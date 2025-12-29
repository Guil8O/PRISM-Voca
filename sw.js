// sw.js
const CACHE_NAME = 'prism-v-v1.5.1'; // 버전을 올리려면 이 변수를 변경하세요 (예: v2)
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './Asset/PrismV_dark.png', // 이미지 경로가 맞는지 확인 필요
    './Asset/PrismV_light.png'
];

// 설치 (캐싱)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
            .then(() => self.skipWaiting()) // 즉시 활성화
    );
});

// 활성화 (구버전 캐시 삭제)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 요청 가로채기 (오프라인 지원)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});