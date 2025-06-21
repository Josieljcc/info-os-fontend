import { Client } from "@/types";

type ClientDetailProp = {
  client: Client | undefined
}

const ClientDetail = ({ client }: ClientDetailProp) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between pb-4 border-b-[.1875rem] border-gray-500/45">
        <h2 className="">Nome:</h2>
        <p className="text-sm font ">{client?.name}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2 className="">Email:</h2>
        <p className="text-sm ">{client?.email}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2 className="">Endereço:</h2>
        <p className="text-sm ">{client?.address}</p>
      </div>
      <div className="flex justify-between py-4 border-b-[.1875rem] border-gray-500/45">
        <h2 className="">Telefone:</h2>
        <p className="text-sm ">{client?.phone}</p>
      </div>
    </div>
  );
}

export default ClientDetail;