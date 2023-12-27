import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 z-50">
      <span className="hidden md:block">
        <Logo />
      </span>
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
