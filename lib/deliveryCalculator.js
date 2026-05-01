export const hostelDeliveryMap = {
  "Boys Hostel 1": 50,
  "Boys Hostel 2": 80,
  "Girls Hostel": 100,
  "International Hostel": 120,
};

export function calculateDelivery(hostel) {
  return hostelDeliveryMap[hostel] || 80;
}