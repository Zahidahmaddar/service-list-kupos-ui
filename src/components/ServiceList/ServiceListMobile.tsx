import React, { useState } from "react";
import { ServiceListProps } from "./types";

const ServiceListMobile: React.FC<ServiceListProps> = (props) => {
  const {
    services = [],
    onServiceSelect,
    onServiceView,
    colors = {},
    showFilters = false,
    filters,
    onFilterChange,
  } = props;

  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    onServiceSelect && onServiceSelect(serviceId);
  };

  const handleServiceView = (serviceId: string) => {
    onServiceView && onServiceView(serviceId);
  };

  return (
    <div
      className="service-list-mobile"
      style={{
        backgroundColor: colors.backgroundColor || "#f8f9fa",
        padding: "15px",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            color: colors.primaryColor || "#333",
            margin: 0,
            fontSize: "20px",
          }}
        >
          Available Services
        </h2>

        {showFilters && (
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            style={{
              backgroundColor: colors.secondaryColor || "#6c757d",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {showFilterPanel ? "Hide Filters" : "Show Filters"}
          </button>
        )}
      </div>

      {showFilters && showFilterPanel && (
        <div
          className="filters"
          style={{
            marginBottom: "15px",
            padding: "12px",
            backgroundColor: colors.cardBackgroundColor || "#fff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>Filters</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filters?.categories && (
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                  Categories
                </label>
                <select
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    width: "100%",
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
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                  Price Range
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="number"
                    placeholder="Min"
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      flex: 1,
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
                      flex: 1,
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

            <div style={{ display: "flex", gap: "10px" }}>
              {filters?.sortBy && (
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Sort By
                  </label>
                  <select
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      width: "100%",
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
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Sort Order
                  </label>
                  <select
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      width: "100%",
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
        </div>
      )}

      <div
        className="services-list"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
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
              <div style={{ display: "flex" }}>
                {service.imageUrl && (
                  <div
                    className="service-image"
                    style={{
                      width: "100px",
                      height: "100px",
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
                <div style={{ padding: "12px", flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: colors.textColor || "#333",
                        fontSize: "16px",
                      }}
                    >
                      {service.name}
                    </h3>
                    {service.rating !== undefined && (
                      <div
                        style={{
                          backgroundColor: colors.primaryColor || "#007bff",
                          color: "#fff",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "12px",
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
                        fontSize: "13px",
                        marginBottom: "10px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
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
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: colors.primaryColor || "#007bff",
                        }}
                      >
                        {service.currency || "$"}
                        {service.price.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  borderTop: "1px solid #eee",
                }}
              >
                <button
                  onClick={() => handleServiceView(service.id)}
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    color: colors.secondaryColor || "#6c757d",
                    border: "none",
                    borderRight: "1px solid #eee",
                    padding: "10px",
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
                    flex: 1,
                    backgroundColor: "transparent",
                    color: service.available
                      ? colors.primaryColor || "#007bff"
                      : "#ccc",
                    border: "none",
                    padding: "10px",
                    cursor: service.available ? "pointer" : "not-allowed",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {service.available ? "Select" : "Unavailable"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "30px 0",
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

export default ServiceListMobile;
