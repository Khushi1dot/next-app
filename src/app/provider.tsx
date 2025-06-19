// app/providers.tsx
'use client';

import { Provider } from 'react-redux';
import store  from '@/Redux/store'; // make sure your store file is correctly defined

export default  function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
