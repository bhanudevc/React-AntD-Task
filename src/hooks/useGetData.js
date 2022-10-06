import React from "react";

const useGetData = () => {
  const data = [];

  for (let i = 1; i <= 35; i++) {
    data.push({
      key: i,
      FirstName: i % 2 == 0 ? `Edward ${i}` : `Joe ${i}`,
      LastName: i % 2 == 0 ? `Brown ${i}` : `King ${i}`,
      DOB: `05/09/${i > 2022 ? "2000" : i}`,
    });
  }
  return data;
};

export default useGetData;
