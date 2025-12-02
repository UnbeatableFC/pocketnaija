import { Testimonial } from "@/app/types/types";

export const TestimonialCard = ({ quote, name, title, avatarUrl }  :Testimonial) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700 h-full flex flex-col justify-between">
        <p className="text-gray-700 dark:text-gray-300 italic mb-4">&ldquo;{quote}&ldquo;</p>
        <div className="flex items-center mt-auto">
            <img 
                src={avatarUrl || `https://placehold.co/40x40/4F46E5/FFFFFF?text=${name.charAt(0)}`} 
                alt={name} 
                className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-primary/50"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/40x40/4F46E5/FFFFFF?text=${name.charAt(0)}` }}
            />
            <div>
                <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
                <p className="text-sm text-primary-500 text-primary">{title}</p>
            </div>
        </div>
    </div>
);