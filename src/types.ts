export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string; // Dynamic icon from lucide-react
  duration: string;
  priceEstimate: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  tag: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  treatment: string;
  date: string;
  message?: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}
