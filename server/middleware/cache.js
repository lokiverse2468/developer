class InMemoryCache {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 5000;
  }

  set(key, value, ttl = this.defaultTTL) {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

const cache = new InMemoryCache();

setInterval(() => cache.cleanup(), 60000);

const cacheMiddleware = (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const queryString = new URLSearchParams(req.query).toString();
  const cacheKey = `${req.path}?${queryString}`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    res.setHeader('X-Cache', 'HIT');
    res.setHeader('X-Cache-Key', cacheKey);
    return res.json(cachedResponse);
  }

  const originalJson = res.json.bind(res);

  res.json = function (data) {
    if (res.statusCode === 200) {
      cache.set(cacheKey, data);
      res.setHeader('X-Cache', 'MISS');
      res.setHeader('X-Cache-Key', cacheKey);
    }
    return originalJson(data);
  };

  next();
};

const invalidateAppointmentsCache = () => {
  const keys = Array.from(cache.cache.keys());
  keys.forEach(key => {
    if (key.includes('/api/appointments')) {
      cache.delete(key);
    }
  });
};

module.exports = {
  cacheMiddleware,
  invalidateAppointmentsCache,
  cache
};

