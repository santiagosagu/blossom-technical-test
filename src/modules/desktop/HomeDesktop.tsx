import image from "@/assets/rick-sanchez-rick-and-morty.png";

export default function HomeDesktop() {
  return (
    <div className="flex-1 flex items-center justify-center h-full">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
            <img
              src={image}
              className="w-full h-full object-cover rounded-full"
              alt="Rick Sanchez"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-balance">
            Interdimensional Character Database
          </h2>
          <p className="text-lg text-muted-foreground mb-6 text-pretty">
            Welcome to Rick's advanced character analysis system. Select a
            character from the left panel to view their interdimensional profile
            and detailed information.
          </p>
        </div>
      </div>
    </div>
  );
}
