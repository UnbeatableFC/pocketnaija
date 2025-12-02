import { Feature } from "@/app/types/types";

 export const FeatureCard = ({ icon, title, description, color }  : Feature) => (
        <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 ${color} transition duration-300 hover:shadow-2xl`}>
            <div className={`p-3 rounded-full inline-block bg-opacity-10 ${color} text-4xl mb-4`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );