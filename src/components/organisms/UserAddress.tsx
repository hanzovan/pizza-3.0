import { UserAddressProps } from "@/types";

export function UserAddress({ user, setUser, isLoading }: UserAddressProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <>
      <label>Full name</label>
      <input
        name="name"
        type="text"
        placeholder="First and last name"
        value={user.name || ""}
        disabled={isLoading}
        onChange={handleInputChange}
      />
      <label>Email</label>
      <input
        name="email"
        type="email"
        value={user.email || ""}
        placeholder="email"
        disabled={true}
      />
      <label>Phone</label>
      <input
        name="phone"
        type="tel"
        placeholder="Phone number"
        value={user.phone || ""}
        disabled={isLoading}
        onChange={handleInputChange}
      />
      <label>Street Address</label>
      <input
        name="streetAddress"
        type="text"
        placeholder="Street Address"
        value={user.streetAddress || ""}
        disabled={isLoading}
        onChange={handleInputChange}
      />
      <div className="flex gap-2 items-center">
        <div>
          <label>Postal Code</label>
          <input
            name="postalCode"
            type="text"
            placeholder="Postal Code"
            value={user.postalCode || ""}
            disabled={isLoading}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            name="city"
            type="text"
            placeholder="City"
            value={user.city || ""}
            disabled={isLoading}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        name="country"
        type="text"
        placeholder="Country"
        value={user.country || ""}
        disabled={isLoading}
        onChange={handleInputChange}
      />
    </>
  );
}
