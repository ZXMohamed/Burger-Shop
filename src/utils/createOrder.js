export const createOrder = (cart, orderId, orderInfo) => ({
    order: cart,
    orderCode: orderId,
    orderInfo: {
        HNo: orderInfo.homeNumber,
        city: orderInfo.city,
        country: orderInfo.country,
        state: orderInfo.state,
        pinCode: orderInfo.pinCode,
        phoneNo: orderInfo.phoneNumber,
        status: "Processing",
        paymentMethod: "Card"
    }
});