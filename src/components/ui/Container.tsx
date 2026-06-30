import { PropsWithChildren } from 'react';

export function Container({ children }: PropsWithChildren) {
  return <div className="bbContainer">{children}</div>;
}
