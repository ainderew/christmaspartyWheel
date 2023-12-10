import {
  ContainerOutlined,
  ReloadOutlined,
  TrophyOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";


interface SidebarProps{
    toggleModal: () => void
}

function SideBar({toggleModal}:SidebarProps): React.ReactElement {
  return (
    <div className='flex flex-col gap-8 items-center justify-center fixed left-0 top-1/2 -translate-y-1/2 border-r-[1px] border-gray-600 w-20 h-full bg-gradient-to-b from-[#190A7F] to-[#16065E]  shadow-2xl'>
      <Tooltip title='Add Entry'>
        <UserAddOutlined
          className='cursor-pointer'
          style={{ fontSize: "1.3rem", color: "#c5c5c5cb" }}
          onClick={toggleModal}
        />
      </Tooltip>
      <Tooltip title='Reset'>
        <ReloadOutlined
          className='cursor-pointer'
          style={{ fontSize: "1.3rem", color: "#c5c5c5cb" }}
        />
      </Tooltip>
      <Tooltip title='Show Original List'>
        <ContainerOutlined
          className='cursor-pointer'
          style={{ fontSize: "1.3rem", color: "#c5c5c5cb" }}
        />
      </Tooltip>
      <Tooltip title='List of Winners'>
        <TrophyOutlined
          className='cursor-pointer'
          style={{ fontSize: "1.3rem", color: "#c5c5c5cb" }}
        />
      </Tooltip>
    </div>
  );
}

export default SideBar;
