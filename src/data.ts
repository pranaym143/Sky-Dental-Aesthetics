import { Service, Review, GalleryItem } from './types';

export const CLINIC_SERVICES: Service[] = [
  {
    id: 'cleaning',
    title: 'Teeth Cleaning & Scaling',
    description: 'Deep removal of plaque, tartar, and stubborn stains to prevent active gum diseases.',
    longDescription: 'Our deep dental scaling and polishing utilizes ultrasonic scalers to remove plaque and calculus deposits under and above the gums. Finished with a luxury fluoride polish to shield and strengthen your teeth.',
    iconName: 'Sparkles',
    duration: '30-45 Mins',
    priceEstimate: '₹1,500'
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    description: 'Transform dull or discolored teeth with our professional high-intensity laser systems.',
    longDescription: 'Get dental shades brighter in one single safe sitting. We utilize hydrogen-peroxide gel activated by advanced cool-blue LED lights, ensuring maximum brightness and zero enamel wear.',
    iconName: 'Sun',
    duration: '45-60 Mins',
    priceEstimate: '₹7,500'
  },
  {
    id: 'rct',
    title: 'Root Canal Treatment',
    description: 'Pain-free computerized RCT to restore severely damaged, infected, or decaying teeth.',
    longDescription: 'Say goodbye to active oral throbbing with state-of-the-art dental lasers. We clear out infected pulp and disinfect the canals, sealing them securely to prevent any secondary infections.',
    iconName: 'Activity',
    duration: '45 Mins / Sitting',
    priceEstimate: '₹4,500'
  },
  {
    id: 'fillings',
    title: 'Dental Fillings',
    description: 'Pristine composite resin restorations that mimic natural teeth for strength and beauty.',
    longDescription: 'Mercury-free tooth-colored composites are applied layer-by-layer and hardened with high-intensity ultraviolet curing lasers, restoring full chewing force and structural integrity.',
    iconName: 'Layers',
    duration: '20-30 Mins',
    priceEstimate: '₹1,200'
  },
  {
    id: 'extraction',
    title: 'Tooth Extraction',
    description: 'Safe, aseptic and pain-free removal of deeply fractured or non-restorable infected teeth.',
    longDescription: 'Using expert modern atraumatic techniques to preserve the surrounding bone, followed by platelet-rich plasma application to accelerate local site recovery times.',
    iconName: 'ShieldAlert',
    duration: '30-45 Mins',
    priceEstimate: '₹1,800'
  },
  {
    id: 'crowns',
    title: 'Dental Crowns',
    description: 'Premium zirconium caps that fit flawlessly over compromised or cracked teeth.',
    longDescription: 'CAD/CAM dental milling techniques allow us to fabricate monolithic zirconia crowns that match your exact natural tooth hue, offering massive lifetime durability.',
    iconName: 'Crown',
    duration: '2 appointments',
    priceEstimate: '₹6,500'
  },
  {
    id: 'bridges',
    title: 'Dental Bridges',
    description: 'Seamless replacement of missing single or multiple neighboring teeth without implants.',
    longDescription: 'Restores the smile gap by supporting a prosthetic crown using durable porcelain caps on the healthy adjacent teeth, securing natural alignment and aesthetics.',
    iconName: 'Grid',
    duration: '2 appointments',
    priceEstimate: '₹12,000'
  },
  {
    id: 'wisdom',
    title: 'Wisdom Tooth Removal',
    description: 'Surgical extraction of impacted wisdom teeth to protect adjacent teeth from damage.',
    longDescription: 'Led by in-house oral maxillofacial surgeons. We remove deep, painful or skewed wisdom teeth comfortably under soft local anesthesia with minimal recovery downtime.',
    iconName: 'Scissors',
    duration: '45-60 Mins',
    priceEstimate: '₹5,000'
  },
  {
    id: 'ortho',
    title: 'Braces & Orthodontics',
    description: 'Premium metal, ceramic, and invisible Invisalign aligners for straight, symmetric teeth.',
    longDescription: 'Achieve perfect straight alignment with either comfortable self-ligating metal brackets or sleek transparent invisible aligner sheets that require minimal clinical dental visits.',
    iconName: 'Compass',
    duration: '6-18 Months',
    priceEstimate: '₹25,000+'
  },
  {
    id: 'smile',
    title: 'Smile Makeover',
    description: 'Individually planned multi-disciplinary smile enhancement designed for your facial lines.',
    longDescription: 'Our hallmark aesthetic therapy blending digital smile previewing, custom porcelain veneers, cosmetic gum adjustments, and micro-contouring to construct your dream radiant look.',
    iconName: 'Heart',
    duration: '7-14 Days',
    priceEstimate: '₹35,000+'
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Artistic teeth contouring, chips repairing, and diastema closure within minutes.',
    longDescription: 'Subtle high-impact touch-ups. Features premium cosmetic adhesive bondings, enamel shaving for correcting uneven corners, and high-shine aesthetic detailing.',
    iconName: 'Wand2',
    duration: '30-60 Mins',
    priceEstimate: '₹3,000'
  },
  {
    id: 'emergency',
    title: 'Emergency Dental Care',
    description: 'Instant prioritization for toothaches, sports jaw trauma, or lost crowns.',
    longDescription: 'Urgent diagnostics, swelling controls, root-decompression and pain resolution. Call +91 90000 90539 for priority medical line booking inside Sky Dental.',
    iconName: 'PhoneCall',
    duration: 'Priority In-Clinic',
    priceEstimate: 'Immediate'
  }
];

export const PATIENT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Santosh Kumar',
    rating: 5,
    date: '1 week ago',
    text: 'Great experience, tooth filling was done really quickly and nicely. Highly professional work.',
    tag: 'Dental Fillings'
  },
  {
    id: 'rev-2',
    name: 'Priya Rajan',
    rating: 5,
    date: '2 weeks ago',
    text: 'Highly recommend for anyone looking for quality dental care. The clinic is hyper-clean and looks like a boutique hotel.',
    tag: 'Teeth Cleaning'
  },
  {
    id: 'rev-3',
    name: 'Anjali Reddy',
    rating: 5,
    date: '1 month ago',
    text: 'The treatment was top-notch and the doctor was professional and caring. Worth every single rupee!',
    tag: 'Smile Makeover'
  },
  {
    id: 'rev-4',
    name: 'Vikram Chawla',
    rating: 5,
    date: '2 months ago',
    text: 'Dr. Vinay explained everything clearly and made me comfortable. The absolute best clinic in Secunderabad.',
    tag: 'Root Canal'
  },
  {
    id: 'rev-5',
    name: 'Nikhil Goud',
    rating: 5,
    date: '3 months ago',
    text: 'Dr. Abhishek’s expertise made the entire treatment journey smooth and zero pain. Highly satisfied.',
    tag: 'Wisdom Extraction'
  }
];

export const CLINIC_STATS = [
  { value: 5.0, suffix: '/5', label: 'Google Rating', sub: 'Highest in Secunderabad' },
  { value: 213, suffix: '+', label: 'Verified Reviews', sub: '100% Real Patients' },
  { value: 15, suffix: '+', label: 'Years Experience', sub: 'Expert Dental Surgeons' },
  { value: 5000, suffix: '+', label: 'Happy Smiles', sub: 'In Thumukunta & Beyond' }
];

export const WHY_CHOOSE_US = [
  {
    title: '5-Star Google Rating',
    description: 'Unblemished 5/5 score representing consistent elite care.',
    iconName: 'Star'
  },
  {
    title: '213+ Happy Patients',
    description: 'Massive local support backing our dedication to dentistry.',
    iconName: 'Users'
  },
  {
    title: 'Experienced Dental Team',
    description: 'Luminaries who guide and nurture your dental wellness correctly.',
    iconName: 'Award'
  },
  {
    title: 'Advanced Equipment',
    description: 'Tuned using low-radiation digital x-rays & high precision lasers.',
    iconName: 'Cpu'
  },
  {
    title: 'Pain-Free Treatments',
    description: 'Advanced computer-controlled anesthesia and comforting touch.',
    iconName: 'Smile'
  },
  {
    title: 'Personalized Care',
    description: 'Custom diagnostics, timeline plans, and pricing suited for you.',
    iconName: 'UserCheck'
  }
];
