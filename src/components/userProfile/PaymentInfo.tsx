interface PaymentInfoProps {
    amountReceived: number;
    amountDue: number;
  }
  
  export const PaymentInfo: React.FC<PaymentInfoProps> = ({ amountReceived, amountDue }) => (
    <div className="grid grid-cols-2 gap-6">
      <div className="grid gap-2">
        <h2 className="text-lg font-semibold">Payment Received</h2>
        <div className="text-4xl font-bold">₹{amountReceived}</div>
      </div>
      <div className="grid gap-2">
        <h2 className="text-lg font-semibold">Payment Due</h2>
        <div className="text-4xl font-bold">₹{amountDue}</div>
      </div>
    </div>
  );