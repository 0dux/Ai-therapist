import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SignInButtonProps {
  className?: string;
}

const SignIn = ({ className }: SignInButtonProps) => {
  return (
    <Button className={className}>
      <Link href={"/login"}>Sign In</Link>
    </Button>
  );
};

export default SignIn;
