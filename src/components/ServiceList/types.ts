export interface ServiceListProps {
  variant?: "mobile" | "desktop";
  
  // Service list specific props
  services?: Array<{
    id: string;
    name: string;
    description?: string;
    price?: number;
    currency?: string;
    imageUrl?: string;
    rating?: number;
    available?: boolean;
    featured?: boolean;
  }>;
  
  // Callback functions
  onServiceSelect?: (serviceId: string) => void;
  onServiceView?: (serviceId: string) => void;
  
  // Styling props
  colors?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    cardBackgroundColor?: string;
    highlightColor?: string;
  };
  
  // Additional props
  showFilters?: boolean;
  filters?: {
    categories?: string[];
    priceRange?: {
      min: number;
      max: number;
    };
    sortBy?: "price" | "rating" | "name";
    sortOrder?: "asc" | "desc";
  };
  onFilterChange?: (filters: any) => void;
}
