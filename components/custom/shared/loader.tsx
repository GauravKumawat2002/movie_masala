import { Loader } from "lucide-react";
export default function SpinningLoader() {
  return (
    <div className="w-36 h-36 mx-auto ">
      <Loader className="animate-spin w-full" />
    </div>
  );
}
