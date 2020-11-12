import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);
  function updateValue(e) {
    const { value } = e.target;
    if (e.target.value === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
