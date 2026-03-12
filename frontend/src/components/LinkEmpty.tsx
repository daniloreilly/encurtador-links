import logoIcon from '../assets/logo.svg';

export const LinkEmpty = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 animate-fade-in">
      <div className="bg-indigo-50 p-3 rounded-xl">
        <span className="text-indigo-600 text-xl font-bold">
          <img src={logoIcon} alt="" />
        </span>
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center text-center font-sans">
        <p className="text-gray-500 text-lg font-medium">
          Nenhum link encontrado
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Cole uma URL acima e clique em "Encurtar" para começar
        </p>
      </div>

      
    </div>
  );
};