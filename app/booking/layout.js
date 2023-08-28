import ContextProvider from "../booking/Context";
export default function BookingLayout({ children }) {
  return (
    <div>
      <ContextProvider>{children}</ContextProvider>
    </div>
  );
}
