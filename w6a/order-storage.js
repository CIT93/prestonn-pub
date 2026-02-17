const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

export const savedOrder = function (orders) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
    } catch 
    (error) {
        console.error(error);
    }
};

export const ordersData = function () {
    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataString) {
            return JSON.parse(dataString);
        }
        return [];
    } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return [];
    }
};