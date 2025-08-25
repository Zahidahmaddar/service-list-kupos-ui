import React from "react";
import { KuposUIComponent } from "./index";

// Sample data for demonstration
const sampleServiceItem = {
  id: "12345",
  operator_details: [
    "https://example.com/logo.png", // logo URL
    "4.5", // rating
    "Operator Name", // operator name
  ],
  travel_date: "2025-08-01T09:00:00Z",
  arrival_date: "2025-08-01T12:00:00Z",
  dep_time: "09:00",
  arr_time: "12:00",
  available_seats: 5,
  seat_types: [
    { label: "Salon Cama", fare: 50 },
    { label: "Premium", fare: 75 },
    { label: "Economy", fare: 40 },
  ],
  offer_text: "Limited time offer: 20% off!",
  is_direct_trip: true,
  icons: {
    origin: "https://example.com/origin.png",
    destination: "https://example.com/destination.png",
    rating: "https://example.com/star.png",
    hours: "https://example.com/clock.png",
  }
};

// Sample data for new ServiceItem component
const sampleNewServiceItem = {
  id: "service123",
  name: "Premium Car Wash",
  description: "Complete exterior and interior cleaning with premium wax and polish",
  price: 49.99,
  currency: "$",
  imageUrl: "https://example.com/carwash.jpg",
  rating: 4.8,
  available: true,
  featured: true,
  duration: "45 min",
  location: "Downtown",
  provider: {
    name: "Sparkle Clean",
    imageUrl: "https://example.com/sparkle.jpg",
    rating: 4.9
  }
};

// Sample data for PaymentSideBar
const samplePaymentData = {
  orderSummary: {
    subtotal: 49.99,
    taxes: 5.00,
    discount: 10.00,
    total: 44.99
  },
  paymentMethods: [
    { id: "card", name: "Credit Card", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "🅿️" },
    { id: "apple", name: "Apple Pay", icon: "🍎" }
  ],
  customerDetails: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555-123-4567"
  },
  orderDetails: [
    { name: "Premium Car Wash", price: 49.99, quantity: 1 }
  ]
};

// Sample data for ServiceList
const sampleServiceList = [
  {
    id: "service123",
    name: "Premium Car Wash",
    description: "Complete exterior and interior cleaning with premium wax and polish",
    price: 49.99,
    currency: "$",
    imageUrl: "https://example.com/carwash.jpg",
    rating: 4.8,
    available: true,
    featured: true
  },
  {
    id: "service456",
    name: "Basic Car Wash",
    description: "Quick exterior wash and vacuum",
    price: 19.99,
    currency: "$",
    imageUrl: "https://example.com/basicwash.jpg",
    rating: 4.2,
    available: true,
    featured: false
  },
  {
    id: "service789",
    name: "Interior Detailing",
    description: "Deep cleaning of all interior surfaces",
    price: 89.99,
    currency: "$",
    imageUrl: "https://example.com/detailing.jpg",
    rating: 4.9,
    available: false,
    featured: false
  }
];

const sampleFilters = {
  categories: ["Wash", "Detailing", "Maintenance"],
  priceRange: { min: 0, max: 100 },
  sortBy: "price" as const,
  sortOrder: "asc" as const
};

/**
 * Example component showing how to use KuposUIComponent with different typeOfComponent values
 */
export default function Example() {
  return (
    <div className="example-container" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>KuposUI Component Examples</h1>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>Service Item Example</h2>
        <KuposUIComponent
          typeOfComponent="serviceitem"
          variant="desktop"
          serviceItem={sampleServiceItem}
          onBookButtonPress={() => console.log("Book button pressed!")}
          colors={{
            kuposButtonColor: "#FF5722",
            priceColor: "#4CAF50",
            tooltipColor: "#333333",
            ratingBorderColor: "#FFC107",
            ratingBottomColor: "#FFF8E1",
            secondaryBgColor: "#E0E0E0",
            secondaryTextColor: "#757575",
            primaryButtonTextColor: "#FFFFFF"
          }}
          translation={{
            buyButton: "Buy",
            soldOutButton: "Sold Out",
            hours: "hrs",
            petFriendly: "Pet Friendly",
            flexible: "Flexible",
            title: "Important Information",
            continueButton: "Continue",
            okContinueButton: "OK, Continue",
            chooseAnotherTripButton: "Choose Another Trip"
          }}
        />
      </section>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>Payment Sidebar Example</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <h3>Desktop Variant</h3>
            <KuposUIComponent
              typeOfComponent="paymentsidebar"
              variant="desktop"
              orderSummary={samplePaymentData.orderSummary}
              paymentMethods={samplePaymentData.paymentMethods}
              customerDetails={samplePaymentData.customerDetails}
              orderDetails={samplePaymentData.orderDetails}
              onPaymentMethodSelect={(id) => console.log(`Selected payment method: ${id}`)}
              onPayButtonClick={() => console.log("Pay button clicked")}
              colors={{
                primaryColor: "#4CAF50",
                secondaryColor: "#2196F3",
                backgroundColor: "#f5f5f5",
                textColor: "#333",
                cardBackgroundColor: "#fff"
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3>Mobile Variant</h3>
            <KuposUIComponent
              typeOfComponent="paymentsidebar"
              variant="mobile"
              orderSummary={samplePaymentData.orderSummary}
              paymentMethods={samplePaymentData.paymentMethods}
              customerDetails={samplePaymentData.customerDetails}
              orderDetails={samplePaymentData.orderDetails}
              onPaymentMethodSelect={(id) => console.log(`Selected payment method: ${id}`)}
              onPayButtonClick={() => console.log("Pay button clicked")}
              colors={{
                primaryColor: "#4CAF50",
                secondaryColor: "#2196F3",
                backgroundColor: "#f5f5f5",
                textColor: "#333",
                cardBackgroundColor: "#fff"
              }}
            />
          </div>
        </div>
      </section>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>Service List Example</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <h3>Desktop Variant</h3>
            <KuposUIComponent
              typeOfComponent="servicelist"
              variant="desktop"
              services={sampleServiceList}
              onServiceSelect={(id) => console.log(`Selected service: ${id}`)}
              onServiceView={(id) => console.log(`Viewing service: ${id}`)}
              showFilters={true}
              filters={sampleFilters}
              onFilterChange={(filters) => console.log('Filters changed:', filters)}
              colors={{
                primaryColor: "#4CAF50",
                secondaryColor: "#2196F3",
                backgroundColor: "#f5f5f5",
                textColor: "#333",
                cardBackgroundColor: "#fff",
                highlightColor: "#FFC107"
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3>Mobile Variant</h3>
            <KuposUIComponent
              typeOfComponent="servicelist"
              variant="mobile"
              services={sampleServiceList}
              onServiceSelect={(id) => console.log(`Selected service: ${id}`)}
              onServiceView={(id) => console.log(`Viewing service: ${id}`)}
              showFilters={true}
              filters={sampleFilters}
              onFilterChange={(filters) => console.log('Filters changed:', filters)}
              colors={{
                primaryColor: "#4CAF50",
                secondaryColor: "#2196F3",
                backgroundColor: "#f5f5f5",
                textColor: "#333",
                cardBackgroundColor: "#fff",
                highlightColor: "#FFC107"
              }}
            />
          </div>
        </div>
      </section>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>New Service Item Example</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <h3>Desktop Variant</h3>
            <KuposUIComponent
              typeOfComponent="serviceitem"
              variant="desktop"
              {...sampleNewServiceItem}
              onBookButtonPress={() => console.log("Book button pressed!")}
              onViewDetails={() => console.log("View details clicked!")}
              colors={{
                primaryColor: "#FF5722",
                secondaryColor: "#2196F3",
                backgroundColor: "#f5f5f5",
                textColor: "#333",
                cardBackgroundColor: "#fff",
                highlightColor: "#FFC107"
              }}
              t={(key) => key} // Simple translation function
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3>Mobile Variant</h3>
            <KuposUIComponent
              typeOfComponent="serviceitem"
              variant="mobile"
              {...sampleNewServiceItem}
              onBookButtonPress={() => console.log("Mobile book button pressed!")}
              onViewDetails={() => console.log("Mobile view details clicked!")}
              colors={{
                primaryColor: "#FF5722",
                secondaryColor: "#2196F3",
                backgroundColor: "#f5f5f5",
                textColor: "#333",
                cardBackgroundColor: "#fff",
                highlightColor: "#FFC107"
              }}
              t={(key) => key} // Simple translation function
            />
          </div>
        </div>
      </section>
      
      <section style={{ marginBottom: "40px" }}>
        <h2>Original Service Item Example</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <h3>Desktop Variant</h3>
            <KuposUIComponent
              typeOfComponent="serviceitem"
              variant="desktop"
              serviceItem={sampleServiceItem}
              onBookButtonPress={() => console.log("Book button pressed!")}
              colors={{
                kuposButtonColor: "#FF5722",
                priceColor: "#4CAF50",
                tooltipColor: "#333333",
                ratingBorderColor: "#FFC107",
                ratingBottomColor: "#FFF8E1",
                secondaryBgColor: "#E0E0E0",
                secondaryTextColor: "#757575",
                primaryButtonTextColor: "#FFFFFF"
              }}
              translation={{
                buyButton: "Buy",
                soldOutButton: "Sold Out",
                hours: "hrs",
                petFriendly: "Pet Friendly",
                flexible: "Flexible"
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3>Mobile Variant</h3>
            <KuposUIComponent
              typeOfComponent="serviceitem"
              variant="mobile"
              serviceItem={sampleServiceItem}
              onBookButtonPress={() => console.log("Mobile book button pressed!")}
              colors={{
                kuposButtonColor: "#FF5722",
                priceColor: "#4CAF50",
                tooltipColor: "#333333"
              }}
              translation={{
                buyButton: "Buy",
                soldOutButton: "Sold Out",
                hours: "hrs"
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
