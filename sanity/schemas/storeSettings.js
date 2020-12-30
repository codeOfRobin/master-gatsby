import { MdStore as icon } from 'react-icons/md';

export default {
  // computer name
  name: 'StoreSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'slicemaster',
      title: 'Slicemasters Currently Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices available in the case',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Pizza' }] }],
    },
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'name of the pizza',
    },
  ],
};
