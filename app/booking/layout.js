import ContextProvider from "./Context";

export default function BookingLayout({ children }) {
  return (
    <ContextProvider>
      <div>{children}</div>
    </ContextProvider>
  );
}
