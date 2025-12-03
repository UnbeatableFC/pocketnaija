import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Testimonial } from "@/app/types/types";

export const TestimonialCard = ({
  quote,
  name,
  title,
  avatarUrl,
}: Testimonial) => {
  return (
    <Card className="h-full flex flex-col justify-between transform hover:scale-[1.03] hover:shadow-2xl dark:hover:shadow-primary/20">
      {/* Header / Rating (Adding a visual element) */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </div>
        {/* Quote Icon */}
        <Quote className="w-6 h-6 text-primary/50 dark:text-primary/30 mb-2 transform rotate-180" />
      </div>

      {/* Content: The Quote */}
      <CardContent className="grow">
        <p className="text-xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed italic">
          {quote}
        </p>
      </CardContent>

      {/* Footer: Author Info */}
      <div className="p-6 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <div className="flex items-center">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
            <AvatarFallback className="bg-linear-to-br from-primary to-secondary text-white">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-semibold text-lg text-gray-900 dark:text-white leading-tight">
              {name}
            </p>
            <p className="text-sm text-primary/70 dark:text-primary/50">
              {title}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
