import React from "react";

const InternationalServicePopupBody: React.FC = () => {
  return (
    <div className="text-base p-2 space-y-6 text-justify">
      <div>
        <p className="bold-text text-lg mb-3">
          Si viajas desde Argentina a Chile, debes contar con:
        </p>
        <div className="pl-6 mb-3 relative">
          <span className="inline-block  h-[7px] w-[7px] rounded-full bg-black justify-center items-center mb-[2px] mr-[5px]"></span>
          Documento de identidad original, vigente y en buen estado.
        </div>
      </div>

      <div className="leading-[1.3]">
        <div className="font-semibold text-lg mb-3">
          Si viajas desde Chile a Argentina, debes contar con:
        </div>
        <div className="pl-6  relative">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-black justify-center items-center mb-[2px] mr-[5px]"></span>
          Documento de identidad original, vigente y en buen estado.
        </div>
        <div className="pl-6  relative">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-black justify-center items-center mb-[2px] mr-[5px]"></span>
          Menores de edad: si viajan con ambos padres certificado de nacimiento
          y documento de identidad vigente. Si va con un solo padre o tutor,
          debe portar un permiso con autorización de viaje.
        </div>
        <div className="pl-6 relative">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-black justify-center items-center mb-[2px] mr-[5px]"></span>
          En caso de viajar con carnet de identidad el chip debe estar
          funcional.
        </div>
      </div>
    </div>
  );
};

export default InternationalServicePopupBody;
