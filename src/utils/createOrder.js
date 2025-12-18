export const createOrder = (cart, orderId, orderInfo) => {

    const cartClone = { ...cart };
    for (let i in cartClone) {
        if (cartClone[i].quantity <= 0)
            delete cartClone[i];
    }
    
    return {
        order: cartClone,
        orderCode: orderId,
        orderInfo: {
            HNo: orderInfo.homeNumber,
            city: orderInfo.city,
            country: orderInfo.country,
            state: orderInfo.state,
            pinCode: orderInfo.pinCode,
            phoneNo: orderInfo.phoneNumber,
            status: "processing",
            paymentMethod: "card"
        }
    }
};