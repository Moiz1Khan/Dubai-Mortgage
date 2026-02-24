"use client";

interface ProfileCardProps {
  name?: string;
  designation?: string;
  image?: string;
}

export function ProfileCard({ name, designation, image }: ProfileCardProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
          {image ? (
            <img
              src={image}
              alt={name || "Team member"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Name */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            {name || "Name"}
          </h3>
          {designation && (
            <p className="text-sm text-muted-foreground">
              {designation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
