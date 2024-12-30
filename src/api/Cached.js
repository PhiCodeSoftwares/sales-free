import { useState, useEffect } from 'react';

function useCachedCustomers() {
  const [cachedCustomers, setCachedCustomers] = useState([]);

  useEffect(() => {
    const customerData = localStorage.getItem('customers');
    if (customerData) {
      setCachedCustomers(JSON.parse(customerData));
    }
  }, []);

  return cachedCustomers;
}