import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserHeaderProps {
  name: string;
  district: string;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ name, district }) => (
  <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
    <div className="max-w-5xl mx-auto flex items-center gap-4">
      <Avatar className="h-16 w-16 md:h-20 md:w-20">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>VV</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold md:text-3xl">{name}</h1>
        <div className="text-sm text-primary-foreground/80 md:text-base">{district}</div>
      </div>
    </div>
  </header>
);