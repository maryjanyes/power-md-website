type Params = {
    productId?: number,
}

export const useProductReviews = (_params: Params) => {
    const reviews = [{
        content: "Сподобався акумулятор, заряджається швидко",
        stars: 4,
    }, {
        content: "Гарний продукт за свої гроші",
        stars: 3,
    }];
    
    return reviews;
};
