export const calculatePrice = ({ purchasePrice, taxes, pricingType, pricingValue }) => {
    const basePrice = parseFloat(purchasePrice) + parseFloat(taxes);
    if (pricingType === "margin") {
      return basePrice * (1 + parseFloat(pricingValue) / 100);
    } else if (pricingType === "markup") {
      return basePrice / (1 - parseFloat(pricingValue) / 100);
    }
    return basePrice;
  };