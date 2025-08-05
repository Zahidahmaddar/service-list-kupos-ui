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

```jsx
import { ServiceItemPB } from "service-item-package";
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
      <ServiceItemPB
        serviceItem={serviceItem}
        onBookButtonPress={() => console.log("Book pressed!")}
      />
    </div>
  );
}
```

## Props

The component accepts the following props:

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
