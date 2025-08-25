import React from "react";
import { ServiceListProps } from "./types";

const ServiceListDesktop: React.FC<ServiceListProps> = (props) => {
  const {
    services = [],
    onServiceSelect,
    onServiceView,
    colors = {},
    showFilters = false,
    filters,
    onFilterChange,
  } = props;

  const handleServiceSelect = (serviceId: string) => {
    onServiceSelect && onServiceSelect(serviceId);
  };

  const handleServiceView = (serviceId: string) => {
    onServiceView && onServiceView(serviceId);
  };

  return (
    <div
      className="service-list-desktop"
      style={{
        backgroundColor: colors.backgroundColor || "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2
        style={{
          color: colors.primaryColor || "#333",
          marginBottom: "20px",
        }}
      >
        Available Services
      </h2>

      {showFilters && (
        <div
          className="filters"
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: colors.cardBackgroundColor || "#fff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "15px", fontSize: "16px" }}>Filters</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {filters?.categories && (
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Categories
                </label>
                <select
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  onChange={(e) =>
                    onFilterChange &&
                    onFilterChange({
                      ...filters,
                      categories: [e.target.value],
                    })
                  }
                >
                  <option value="">All Categories</option>
                  {filters.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {filters?.priceRange && (
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Price Range
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="number"
                    placeholder="Min"
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      width: "80px",
                    }}
                    value={filters.priceRange.min}
                    onChange={(e) =>
                      onFilterChange &&
                      onFilterChange({
                        ...filters,
                        priceRange: {
                          ...filters.priceRange,
                          min: Number(e.target.value),
                        },
                      })
                    }
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      width: "80px",
                    }}
                    value={filters.priceRange.max}
                    onChange={(e) =>
                      onFilterChange &&
                      onFilterChange({
                        ...filters,
                        priceRange: {
                          ...filters.priceRange,
                          max: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}

            {filters?.sortBy && (
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Sort By
                </label>
                <select
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  value={filters.sortBy}
                  onChange={(e) =>
                    onFilterChange &&
                    onFilterChange({
                      ...filters,
                      sortBy: e.target.value as "price" | "rating" | "name",
                    })
                  }
                >
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>
            )}

            {filters?.sortOrder && (
              <div>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Sort Order
                </label>
                <select
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  value={filters.sortOrder}
                  onChange={(e) =>
                    onFilterChange &&
                    onFilterChange({
                      ...filters,
                      sortOrder: e.target.value as "asc" | "desc",
                    })
                  }
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              className="service-card"
              style={{
                backgroundColor: colors.cardBackgroundColor || "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                border: service.featured
                  ? `2px solid ${colors.highlightColor || "#ffc107"}`
                  : "none",
              }}
            >
              {service.imageUrl && (
                <div
                  className="service-image"
                  style={{
                    height: "160px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div style={{ padding: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: colors.textColor || "#333",
                      fontSize: "18px",
                    }}
                  >
                    {service.name}
                  </h3>
                  {service.rating !== undefined && (
                    <div
                      style={{
                        backgroundColor: colors.primaryColor || "#007bff",
                        color: "#fff",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      {service.rating.toFixed(1)} ★
                    </div>
                  )}
                </div>

                {service.description && (
                  <p
                    style={{
                      color: colors.textColor || "#666",
                      fontSize: "14px",
                      marginBottom: "15px",
                    }}
                  >
                    {service.description}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {service.price !== undefined && (
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: colors.primaryColor || "#007bff",
                      }}
                    >
                      {service.currency || "$"}
                      {service.price.toFixed(2)}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleServiceView(service.id)}
                      style={{
                        backgroundColor: "transparent",
                        color: colors.secondaryColor || "#6c757d",
                        border: `1px solid ${colors.secondaryColor || "#6c757d"}`,
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleServiceSelect(service.id)}
                      disabled={!service.available}
                      style={{
                        backgroundColor: service.available
                          ? colors.primaryColor || "#007bff"
                          : "#ccc",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: service.available ? "pointer" : "not-allowed",
                        fontSize: "14px",
                      }}
                    >
                      {service.available ? "Select" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "40px 0",
              color: colors.textColor || "#666",
            }}
          >
            No services available
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceListDesktop;
