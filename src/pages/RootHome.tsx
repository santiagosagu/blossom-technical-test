import { useMediaQuery } from "react-responsive";
import { HomeMobile } from "@/modules/mobile/HomeMobile";
import HomeDesktop from "@/modules/desktop/HomeDesktop";

export default function RootHome() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="max-md:min-h-screen md:flex md:h-full md:w-full bg-background">
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </div>
  );
}
