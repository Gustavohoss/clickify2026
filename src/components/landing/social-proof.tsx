
'use client';

import FallingNotifications from './falling-notifications';

const SocialProof = () => {
  return (
    <section className="py-1 bg-background text-center relative">
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
      <div className="container mx-auto px-1">
        <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body">
            <span className="text-primary">Venda todos os dias</span> com os nossos metodos e <span className="text-primary">video aulas exclusivos</span>
        </h1>
        <div className="mt-8 flex justify-center">
          <div className="relative h-[700px] w-[300px]">
            <img
              src="https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/cmjclddjn000kl204sjzbusjb/blocks/bshr2y6v3sd34qgax45ugqon?v=1766387247350"
              alt="Fundo de tela do celular"
              width={300}
              height={700}
              className="z-0 rounded-[2.5rem]"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center p-4 space-y-4 justify-end pb-12 overflow-hidden">
              <FallingNotifications />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
