import { FiCheck } from "react-icons/fi";

export const AuthBrandingSide = ({ title, description, features }) => {
  return (
    <div className="hidden lg:flex flex-col justify-center p-10 bg-gradient-to-br from-[#B21F1F] to-[#8B1616] rounded-2xl text-white shadow-xl">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-3">🍽️ ReeFood</h2>
        <p className="text-xl font-semibold mb-3">{title}</p>
        <p className="text-base opacity-90 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiCheck className="text-white text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-base mb-0.5">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
