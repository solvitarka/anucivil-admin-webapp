import { MailOpenIcon, PhoneIcon, MapPinIcon, LocateIcon } from 'lucide-react';

interface ContactInfoProps {
  email: string;
  phone: string;
  address: {
    street: string;
    district: string;
    town: string;
    state: string;
    pincode: string;
  };
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ email, phone, address }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <div className="grid gap-2">
      <h2 className="text-lg font-semibold">Contact</h2>
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <MailOpenIcon className="w-5 h-5 text-muted-foreground" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-muted-foreground" />
          <span>{phone}</span>
        </div>
      </div>
    </div>
    <div className="grid gap-2">
      <h2 className="text-lg font-semibold">Address</h2>
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-muted-foreground" />
          <span>{address.street}</span>
        </div>
        <div className="flex items-center gap-2">
          <LocateIcon className="w-5 h-5 text-muted-foreground" />
          <span>{`${address.district}, ${address.town}, ${address.state} - ${address.pincode}`}</span>
        </div>
      </div>
    </div>
  </div>
);