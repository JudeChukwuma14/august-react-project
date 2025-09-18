import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      country: "",
      state: "",
      city: "",
      phone: "",
    },
  });

  // Watch country and state for dynamic dropdowns
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  // Get country, state, and city data
  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Format price in NGN
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(price));

  // Handle form submission
  const onSubmit = (data) => {
    // Simulate order processing (replace with actual API call)
    console.log("Checkout data:", { ...data, cartItems, totalPrice });
    toast.success("Order placed successfully!");
    // Optionally clear cart here using dispatch(resetCart());
    navigate("/order-confirmation"); // Redirect to a confirmation page
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-center mb-8">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-6">
              Your cart is empty
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-[#36d7b7] text-white rounded-md text-sm font-medium hover:bg-[#2abca0] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-last lg:order-first">
              <div className="bg-white shadow-card rounded-lg p-6 sticky top-4">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {item.name} (x{item.quantity || 1})
                      </span>
                      <span>
                        ₦{formatPrice(item.price * (item.quantity || 1))}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₦{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-card rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Shipping Information
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* First Name and Last Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#36d7b7] focus:border-[#36d7b7] outline-none"
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#36d7b7] focus:border-[#36d7b7] outline-none"
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#36d7b7] focus:border-[#36d7b7] outline-none"
                        placeholder="Email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        {...register("address", {
                          required: "Address is required",
                        })}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#36d7b7] focus:border-[#36d7b7] outline-none"
                        placeholder="Street Address"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#36d7b7] focus:border-[#36d7b7] outline-none"
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              // Reset state and city when country changes
                              field.onChange(e.target.value);
                            }}
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option
                                key={country.isoCode}
                                value={country.isoCode}
                              >
                                {country.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <Controller
                        name="state"
                        control={control}
                        rules={{ required: "State is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#36d7b7] focus:border-[#36d7b7] outline-none"
                            disabled={!selectedCountry}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              // Reset city when state changes
                              field.onChange(e.target.value);
                            }}
                          >
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: "City is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#36d7b7] focus:border-[#36d7b7] outline-none"
                            disabled={!selectedState}
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "Phone number is required" }}
                        render={({ field }) => (
                          <PhoneInput
                            country={"ng"} // Default to Nigeria
                            value={field.value}
                            onChange={field.onChange}
                            inputClass="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#36d7b7] focus:border-[#36d7b7] outline-none"
                            containerClass="mt-1"
                            buttonClass="border border-gray-300"
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-between items-center">
                    <Link to="/cart" className="text-[#36d7b7] hover:underline">
                      Back to Cart
                    </Link>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#36d7b7] text-white rounded-md text-sm font-medium hover:bg-[#2abca0] transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
