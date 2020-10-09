import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
}).format;

function PriceInput({ type, value, onChange, forwardedRef }) {
  return (
    <div>
      <h2>
        {type.title} {value ? `- ${formatMoney(value / 100)}` : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={forwardedRef}
      />
    </div>
  );
}

// Sanity accessibility
PriceInput.focus = function () {
  this._inputElement.focus();
};

export default forwardRef((props, ref) => (
  <PriceInput {...props} forwardedRef={ref} />
));
