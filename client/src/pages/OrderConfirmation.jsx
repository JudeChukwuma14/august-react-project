// pages/OrderConfirmation.js
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Truck } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, orderTotal, shippingInfo } = location.state || {};

  // Format price in NGN
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(price || 0));

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">Unable to retrieve order details.</p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-[#36d7b7] text-white rounded-md hover:bg-[#2abca0]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{orderId}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">₦{formatPrice(orderTotal)}</p>
              </div>
              
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Shipping Address</p>
                <p className="font-medium">
                  {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.state}, {shippingInfo?.country}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <Truck className="h-6 w-6 text-[#36d7b7] mr-2" />
            <p className="text-sm text-gray-600">
              You will receive an email confirmation shortly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/orders"
              className="px-6 py-3 bg-[#36d7b7] text-white rounded-md hover:bg-[#2abca0] transition-colors"
            >
              View My Orders
            </Link>
            
            <Link
              to="/shop"
              className="px-6 py-3 border border-[#36d7b7] text-[#36d7b7] rounded-md hover:bg-[#36d7b7] hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#36d7b7] rounded-full h-6 w-6 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0">
                1
              </div>
              <p>Order processing (within 24 hours)</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#36d7b7] rounded-full h-6 w-6 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0">
                2
              </div>
              <p>Shipping confirmation email</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#36d7b7] rounded-full h-6 w-6 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0">
                3
              </div>
              <p>Delivery within 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;