

export const ReviewData = [
  {
    id: "#EMP-0001",
    name: "Zain Torff",
    image: "/images/guest1.png", 
    date: "Monday, April 27th 2026",
    title: "I love that room service",
    comment: "We were totally satisfied and rejuvenated for the whole of next year and it was due to the relaxing stay at this hotel. The room service was perfect!",
    rating: 4.1,
    badges: ["Great Service", "Recommended"],
    status: "new"
  },
  {
    id: "#EMP-0002",
    name: "Adison Kenter",
    image: "/images/guest2.png",
    date: "Sunday, April 26th 2026",
    title: "Bad Room Ever",
    comment: "The room was not clean and the staff was very rude. I had a terrible experience staying here. Would not recommend to anyone.",
    rating: 2.5,
    badges: ["Bad Service", "Pricey"],
    status: "published"
  },
  {
    id: "#EMP-0003",
    name: "Emery Dias",
    image: "/images/staff1.png",
    date: "Saturday, April 25th 2026",
    title: "Best Hotel in London!",
    comment: "Error expedita voluptatibus at qui molestiae numquam dolorem autem voluptas. Quo amet dicta corporis quis alias.",
    rating: 4.8,
    badges: ["Luxury", "Clean"],
    status: "new"
  },
  {
    id: "#EMP-0004",
    name: "Livia Korsgaard",
    image: "/images/guest3.png",
    date: "Friday, April 24th 2026",
    title: "Great View at the Top",
    comment: "You get a great view at the top of the buildings. The architecture is amazing and the food is delicious.",
    rating: 3.9,
    badges: ["Good View", "Fine Dining"],
    status: "published"
  },
  {
    id: "#EMP-0005",
    name: "Jocelyn Bergson",
    image: "/images/staff2.png",
    date: "Thursday, April 23rd 2026",
    title: "Wonderful Experience",
    comment: "Everything was perfect from check-in to check-out. The spa facilities are top-notch.",
    rating: 5.0,
    badges: ["Excellent", "Spa"],
    status: "new"
  },
  {
    id: "#EMP-0006",
    name: "Maren Culhane",
    image: "/images/guest4.png",
    date: "Wednesday, April 22nd 2026",
    title: "Average Stay",
    comment: "The hotel was okay but nothing special for the price they charge. Standard amenities were missing.",
    rating: 3.0,
    badges: ["Neutral"],
    status: "archived"
  },
  {
    id: "#EMP-0007",
    name: "James Baptista",
    image: "/images/staff3.png",
    date: "Tuesday, April 21st 2026",
    title: "Highly Recommended",
    comment: "The location is central and very convenient. Staff went above and beyond to help us.",
    rating: 4.5,
    badges: ["Helpful Staff", "Central"],
    status: "published"
  },
  {
    id: "#EMP-0008",
    name: "Anika Press",
    image: "/images/guest5.png",
    date: "Monday, April 20th 2026",
    title: "Never Again",
    comment: "AC was not working and there was no water in the morning. Complete disaster.",
    rating: 1.2,
    badges: ["Poor Service"],
    status: "new"
  },
  {
    id: "#EMP-0009",
    name: "Kadin Herwitz",
    image: "/images/staff4.png",
    date: "Sunday, April 19th 2026",
    title: "Good for Business",
    comment: "Fast Wi-Fi and quiet rooms. Perfect for a business trip and quick meetings.",
    rating: 4.2,
    badges: ["Business", "Fast Wi-Fi"],
    status: "published"
  },
  {
    id: "#EMP-0010",
    name: "Gustavo George",
    image: "/images/guest6.png",
    date: "Saturday, April 18th 2026",
    title: "Loved the Breakfast",
    comment: "The breakfast buffet has so many options! Loved the fresh pancakes and juice.",
    rating: 4.7,
    badges: ["Great Food", "Breakfast"],
    status: "new"
  },
  // Dynamic entries update
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `#EMP-00${i + 11}`,
    name: `Guest User ${i + 11}`,
    image: `/images/guest${(i % 6) + 1}.png`, // Updated path here too
    date: "April 2026",
    title: "Clean and Professional Stay",
    comment: "The hotel staff was very professional. The room was clean and well-maintained throughout our visit.",
    rating: (Math.random() * (5 - 3) + 3).toFixed(1),
    badges: ["Verified", "Clean"],
    status: i % 2 === 0 ? "published" : "new"
  }))
];