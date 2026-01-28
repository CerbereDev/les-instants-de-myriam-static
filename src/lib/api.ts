const API_BASE = 'http://localhost:3333';

export const fetchAboutMe = async (id: number) => {
  const res = await fetch(`${API_BASE}/about-me/${id}`);
  if (!res.ok) throw new Error('Failed to fetch about me');
  return res.json();
};

export const fetchServices = async () => {
  const res = await fetch(`${API_BASE}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
};

export const fetchHeroBanner = async (id: number) => {
  const res = await fetch(`${API_BASE}/hero-banner/${id}`);
  if (!res.ok) throw new Error('Failed to fetch hero banner');
  return res.json();
};

export const fetchPortfolio = async (id: number) => {
  const res = await fetch(`${API_BASE}/portfolio/${id}`);
  if (!res.ok) throw new Error('Failed to fetch portfolio');
  return res.json();
};