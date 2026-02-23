import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <p className="text-3xl font-semibold">Page not found</p>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/products">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;