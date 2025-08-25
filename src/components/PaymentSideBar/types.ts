export interface PaymentSideBarProps {
  variant?: "mobile" | "desktop";
  
  // Payment-specific props
  amount?: number;
  currency?: string;
  paymentMethods?: Array<{
    id: string;
    name: string;
    icon?: string;
    isSelected?: boolean;
  }>;
  customerDetails?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  onPaymentComplete?: (paymentId: string) => void;
  onPaymentError?: (error: any) => void;
  
  // Styling props
  colors?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
  };
  
  // Additional props
  showSummary?: boolean;
  orderDetails?: {
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    subtotal: number;
    tax?: number;
    discount?: number;
    total: number;
  };
}
