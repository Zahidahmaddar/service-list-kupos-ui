# Service Item Package

A reusable React component for displaying service items in transportation and
booking applications.

## Installation

```bash
npm install service-item-package
# or
yarn add service-item-package
```

## Usage

### Using the KuposUIComponent

The `KuposUIComponent` is a versatile component that can render different UI components based on the `typeOfComponent` prop:

```jsx
import { KuposUIComponent } from "service-item-package";
import "service-item-package/dist/styles.css"; // If you add CSS in the future

// Sample data
const serviceItem = {
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
};

function App() {
  return (
    <div>
      {/* Render Service Item */}
      <KuposUIComponent
        typeOfComponent="serviceitem"
        variant="desktop"
        serviceItem={serviceItem}
        onBookButtonPress={() => console.log("Book pressed!")}
      />
      
      {/* Render Payment Sidebar */}
      <KuposUIComponent
        typeOfComponent="paymentsidebar"
        variant="desktop"
        // Add payment sidebar specific props here
      />
      
      {/* Render Service List */}
      <KuposUIComponent
        typeOfComponent="servicelist"
        variant="mobile"
        // Add service list specific props here
      />
    </div>
  );
}
```

### Using Individual Components

You can also use the individual components directly:

```jsx
import { ServiceItemPB } from "service-item-package";

function App() {
  return (
    <div>
      <ServiceItemPB
        serviceItem={serviceItem}
        onBookButtonPress={() => console.log("Book pressed!")}
      />
    </div>
  );
}
```

## Props

### KuposUIComponent Props

| Prop            | Type     | Description                                                |
| --------------- | -------- | ---------------------------------------------------------- |
| typeOfComponent | string   | Type of component to render: "serviceitem", "paymentsidebar", or "servicelist" |
| variant         | string   | "mobile" or "desktop" to specify the variant               |
| ...other props  | various  | All props required by the specific component type          |

### ServiceItem Props

| Prop                  | Type     | Description                                  |
| --------------------- | -------- | -------------------------------------------- |
| serviceItem           | Object   | The service item data object                 |
| onBookButtonPress     | Function | Callback for when the book button is pressed |
| serviceDetailsLoading | boolean  | Whether service details are loading          |
| t                     | Function | Optional translation function                |

## Development

```bash
# Install dependencies
npm install

# Build package
npm run build
```

## License

MIT
