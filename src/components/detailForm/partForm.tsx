import { Part } from "@/types";

type PartDetailProp = {
  part: Part | undefined;
};

const PartDetailForm = ({ part }: PartDetailProp) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between pb-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Nome:</h2>
        <p className="text-sm font ">{part?.name}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Preço:</h2>
        <p className="text-sm ">{part?.price}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2>Quantidade:</h2>
        <p className="text-sm ">{part?.quantity}</p>
      </div>
      <div className="flex justify-between py-4 pb-9 border-b-[.1875rem] border-gray-500/45">
        <h2>Descrição:</h2>
        <p className="text-sm ">{part?.description}</p>
      </div>
    </div>
  );
};

export default PartDetailForm;
