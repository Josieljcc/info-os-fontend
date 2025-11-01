import DrawerClient from "@/components/drawerClient/drawerClient";
import DrawerEquipment from "@/components/drawerEquipment/drawerEquipment";
import DrawerPart from "@/components/drawerPart/drawerPart";
import DrawerService from "@/components/drawerService/drawerService";
import { Button } from "@/components/ui/button";
import useDbBackup from "@/hook/useDbBackup";


const Home = () => {
  const { downloadBackup, uploadBackup } = useDbBackup()

  const handleDownloadBackup = () => {
    downloadBackup()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadBackup(file);
    }
  };

  return (
    <div className="h-dvh flex flex-col w-full bg-[#141414] ">
      <DrawerClient />
      <DrawerPart />
      <DrawerService />
      <DrawerEquipment />
      <Button onClick={handleDownloadBackup}>Download Backup</Button>
      <input type="file" accept=".sql" onChange={handleFileChange} />
    </div>
  );
};

export default Home;
