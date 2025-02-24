import { Truck, Home, ShoppingBag, Wrench, Dog, Camera, Book, Leaf, PartyPopper, Briefcase, Laptop } from 'lucide-react';

// Category icons mapping
export const categoryIcons = {
  Moving: Truck,
  Household: Home,
  Delivery: ShoppingBag,
  Repairs: Wrench,
  Pets: Dog,
  Creative: Camera,
  Teaching: Book,
  Gardening: Leaf,
  Event: PartyPopper,
  Technical: Laptop,
  General: Briefcase
};

// Category to tags mapping
export const categoryMapping = {
  'Moving': ['Moving', 'Furniture', 'Heavy Lifting'],
  'Household': ['Household', 'Cleaning', 'Indoor'],
  'Delivery': ['Delivery', 'Food', 'Local'],
  'Repairs': ['Repairs', 'Plumbing', 'Maintenance'],
  'Pets': ['Pets', 'Dog', 'Pet Care'],
  'Creative': ['Photography', 'Creative', 'Art'],
  'Teaching': ['Teaching', 'Language', 'Cultural Exchange'],
  'Gardening': ['Gardening', 'Outdoor', 'Maintenance'],
  'Event': ['Event', 'Party', 'Setup'],
  'Technical': ['Technology', 'Smart Home', 'Installation']
};

// Helper function to get job category
export const getJobCategory = (tags) => {
  for (const [category, categoryTags] of Object.entries(categoryMapping)) {
    if (tags.some(tag => categoryTags.includes(tag))) {
      return category;
    }
  }
  return 'General';
};

export const allJobs = [
  {
    id: 1,
    title: "Help Moving Furniture",
    distance: "2.5 km away",
    duration: "3-4 hours",
    payment: "€80",
    description: "Need help moving furniture from a 2nd floor apartment to a moving truck. Some heavy lifting required. Must be able to handle stairs.",
    introduction: "We are looking for reliable individuals to assist with a residential move in the heart of the city. This is a perfect opportunity for someone who enjoys physical work and has experience in careful handling of furniture.",
    fullDescription: "The job involves helping move furniture and boxes from a second-floor apartment to a moving truck parked within 50 meters of the building entrance. The move includes various items such as a sofa, bed, dining table, and approximately 20 boxes of varying sizes.",
    requirements: [
      "Ability to lift and carry heavy items (up to 25kg)",
      "Experience in furniture moving preferred",
      "Reliable and punctual",
      "Good physical condition",
      "Ability to work well in a team"
    ],
    benefits: [
      "Flexible payment options",
      "Refreshments provided",
      "Potential for future moving jobs"
    ],
    location: {
      address: "Musterstraße 123",
      city: "Berlin",
      district: "Mitte",
      coordinates: {
        lat: 52.520008,
        lng: 13.404954
      }
    },
    tags: ["Moving", "Heavy Lifting", "Furniture"],
    verified: true,
    rating: "4.8"
  },
  {
    id: 2,
    title: "Garden Maintenance",
    distance: "5 km away",
    duration: "4 hours",
    payment: "€65",
    description: "Looking for someone to help with garden work including mowing, weeding, and trimming hedges. Tools provided.",
    introduction: "We need an experienced gardener for regular maintenance of our residential garden. This is an excellent opportunity for someone with a green thumb and attention to detail.",
    fullDescription: "The garden is approximately 200 square meters and requires comprehensive maintenance including lawn mowing, hedge trimming, weeding, and general cleanup. All necessary tools and equipment will be provided on-site.",
    requirements: [
      "Previous gardening experience",
      "Knowledge of basic garden maintenance",
      "Ability to use garden tools safely",
      "Reliable and detail-oriented",
      "Available for regular maintenance"
    ],
    benefits: [
      "Regular work opportunity",
      "Flexible scheduling",
      "All tools provided",
      "Pleasant working environment"
    ],
    location: {
      address: "Gartenweg 45",
      city: "Berlin",
      district: "Charlottenburg",
      coordinates: {
        lat: 52.515793,
        lng: 13.322050
      }
    },
    tags: ["Gardening", "Outdoor", "Maintenance"],
    verified: true,
    rating: "4.5"
  },
  {
    id: 3,
    title: "Package Delivery Helper",
    distance: "1.8 km away",
    duration: "2-3 hours",
    payment: "€45",
    description: "Need assistance delivering packages in the local area. Must have valid driver's license and clean driving record.",
    introduction: "Join our local delivery team for a fast-paced package delivery role. Perfect for someone who enjoys driving and wants flexible working hours.",
    fullDescription: "We are seeking a delivery assistant to help with local package deliveries. The role involves organizing packages by delivery route, navigating through the city efficiently, and ensuring timely delivery to customers.",
    requirements: [
      "Valid driver's license",
      "Clean driving record",
      "Good knowledge of local area",
      "Physically fit for handling packages",
      "Strong customer service skills"
    ],
    benefits: [
      "Flexible working hours",
      "Fuel compensation",
      "Performance bonuses available"
    ],
    location: {
      address: "Logistics Center, Industriestraße 78",
      city: "Berlin",
      district: "Wedding",
      coordinates: {
        lat: 52.542699,
        lng: 13.387547
      }
    },
    tags: ["Delivery", "Local", "Driving"],
    verified: false,
    rating: "4.2"
  },
  {
    id: 4,
    title: "Dog Walking Service",
    distance: "0.5 km away",
    duration: "1-2 hours",
    payment: "€25",
    description: "Looking for a reliable dog walker for our friendly Golden Retriever. Daily walks needed during weekdays.",
    introduction: "We're seeking an experienced dog walker who loves animals and can provide regular walking services for our energetic family pet.",
    fullDescription: "The job involves taking our 3-year-old Golden Retriever on daily walks during weekdays. The ideal candidate should be comfortable handling medium to large dogs and be available for a consistent schedule.",
    requirements: [
      "Experience with dogs",
      "Available weekdays",
      "Reliable and punctual",
      "Good physical stamina",
      "Love for animals"
    ],
    benefits: [
      "Regular income opportunity",
      "Flexible morning or afternoon schedule",
      "Great for animal lovers",
      "Exercise while working"
    ],
    location: {
      address: "Hundeweg 12",
      city: "Berlin",
      district: "Prenzlauer Berg",
      coordinates: {
        lat: 52.532899,
        lng: 13.412847
      }
    },
    tags: ["Pets", "Dog", "Pet Care"],
    verified: true,
    rating: "4.9"
  },
  {
    id: 5,
    title: "Photography Assistant",
    distance: "3.2 km away",
    duration: "6 hours",
    payment: "€120",
    description: "Need an assistant for a wedding photography shoot. Experience with photography equipment required.",
    introduction: "Seeking a skilled photography assistant for a wedding event. This is an excellent opportunity for someone with photography experience who wants to gain more exposure in event photography.",
    fullDescription: "The role involves assisting the main photographer during a wedding ceremony and reception. Tasks include equipment setup, lighting adjustment, capturing candid moments, and managing photography equipment throughout the event.",
    requirements: [
      "Photography experience",
      "Knowledge of camera equipment",
      "Professional appearance",
      "Good communication skills",
      "Ability to work in fast-paced environment"
    ],
    benefits: [
      "Networking opportunity",
      "Portfolio building",
      "Meal provided",
      "Potential for future assignments"
    ],
    location: {
      address: "Hochzeitssaal, Feststraße 34",
      city: "Berlin",
      district: "Kreuzberg",
      coordinates: {
        lat: 52.497222,
        lng: 13.395556
      }
    },
    tags: ["Photography", "Creative", "Event"],
    verified: true,
    rating: "4.7"
  },
  {
    id: 6,
    title: "Home Tech Setup",
    distance: "4.1 km away",
    duration: "2-3 hours",
    payment: "€75",
    description: "Need help setting up smart home devices including security cameras, smart lights, and home automation system.",
    introduction: "Looking for a tech-savvy individual to assist with smart home device installation and configuration. Perfect for someone with experience in home automation systems.",
    fullDescription: "The job involves installing and configuring various smart home devices including Phillips Hue lights, Ring security cameras, and a Samsung SmartThings hub. Knowledge of WiFi networks and smart home ecosystems is essential.",
    requirements: [
      "Experience with smart home devices",
      "Basic networking knowledge",
      "Problem-solving skills",
      "Patient and detail-oriented",
      "Good communication skills"
    ],
    benefits: [
      "One-time project",
      "Flexible scheduling",
      "Potential for recurring tech support",
      "Indoor climate-controlled environment"
    ],
    location: {
      address: "Technikstraße 56",
      city: "Berlin",
      district: "Friedrichshain",
      coordinates: {
        lat: 52.515556,
        lng: 13.454722
      }
    },
    tags: ["Technology", "Smart Home", "Installation"],
    verified: true,
    rating: "4.6"
  },
  {
    id: 7,
    title: "Language Exchange Partner",
    distance: "1.5 km away",
    duration: "1.5 hours",
    payment: "€30",
    description: "Looking for a native English speaker for conversation practice and language exchange. Intermediate level German required.",
    introduction: "Seeking a bilingual conversation partner for regular language exchange sessions. This is an ideal opportunity for someone who enjoys teaching and cultural exchange.",
    fullDescription: "Weekly conversation sessions to help improve English speaking skills. The format will include structured conversation practice, grammar correction, and cultural exchange discussions.",
    requirements: [
      "Native English speaker",
      "Intermediate German skills",
      "Teaching experience preferred",
      "Patient and encouraging attitude",
      "Reliable and punctual"
    ],
    benefits: [
      "Regular weekly engagement",
      "Improve your German skills",
      "Cultural exchange opportunity",
      "Comfortable café setting"
    ],
    location: {
      address: "Sprachcafé, Kulturstraße 89",
      city: "Berlin",
      district: "Neukölln",
      coordinates: {
        lat: 52.483333,
        lng: 13.422778
      }
    },
    tags: ["Teaching", "Language", "Cultural Exchange"],
    verified: true,
    rating: "4.8"
  },
  {
    id: 8,
    title: "Event Setup Assistant",
    distance: "6.3 km away",
    duration: "5 hours",
    payment: "€90",
    description: "Need help setting up and breaking down a corporate event space. Includes arranging furniture, setting up AV equipment, and general venue preparation.",
    introduction: "We're looking for reliable individuals to assist with corporate event setup and breakdown. Experience in event setup or AV equipment handling is a plus.",
    fullDescription: "The job involves preparing a conference venue for a corporate event. Tasks include arranging chairs and tables, setting up projectors and sound equipment, placing signage, and helping with general venue preparation.",
    requirements: [
      "Physical stamina for moving furniture",
      "Basic technical knowledge",
      "Attention to detail",
      "Available for early morning setup",
      "Team player attitude"
    ],
    benefits: [
      "One-time opportunity",
      "Meal provided",
      "Potential for future event work",
      "Indoor air-conditioned environment"
    ],
    location: {
      address: "Konferenzhaus, Messestraße 100",
      city: "Berlin",
      district: "Moabit",
      coordinates: {
        lat: 52.525556,
        lng: 13.341667
      }
    },
    tags: ["Event", "Setup", "Party"],
    verified: false,
    rating: "4.4"
  }
];