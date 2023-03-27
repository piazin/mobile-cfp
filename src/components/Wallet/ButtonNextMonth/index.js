import { useEffect, useState } from 'react';
import { Button } from 'react-native';

export const ButtonNextMonth = ({ items, ...props }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(items);
  }, []);

  const handleNextItem = () => {};

  return (
    <>
      <Button {...props} />
    </>
  );
};
