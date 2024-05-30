import {
  IconCategory,
  IconCategory2,
  IconCategoryFilled,
  IconCategoryMinus,
  IconCircleDot,
  IconHome,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CategoryIcon from '@mui/icons-material/Category';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';


const Menuitems = [
  {
    id: uniqueId(),
    title: "Trang chủ",
    icon: IconHome,
    href: "/admin/pages/dashboard",
  },
  {
    id: uniqueId(),
    title: "Bản tin",
    icon: MailOutlineIcon,
    href: "",
    children: [
      {
        id: uniqueId(),
        title: "Chờ phê duyệt",
        icon: FiberManualRecordOutlinedIcon,
        href: "/admin/pages/news/pending-approval",
      },
      {
        id: uniqueId(),
        title: "Chờ xuất bản",
        icon: FiberManualRecordOutlinedIcon,
        href: "/admin/pages/news/publish-wait",
      },
      {
        id: uniqueId(),
        title: "Đã xuất bản",
        icon: FiberManualRecordOutlinedIcon,
        href: "/admin/pages/news/published",
      },
      {
        id: uniqueId(),
        title: "Bị từ chối",
        icon: FiberManualRecordOutlinedIcon,
        href: "/admin/pages/news/rejected-publish",
      },
      {
        id: uniqueId(),
        title: "Đã gỡ",
        icon: FiberManualRecordOutlinedIcon,
        href: "/admin/pages/news/removed-publish",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Soạn tin",
    icon: IconCategory,
    href: "/admin/pages/create-news",
  },
  {
    id: uniqueId(),
    title: "Danh mục",
    icon: IconCategory,
    href: "/admin/pages/category",
  },
  {
    id: uniqueId(),
    title: "Giao diện",
    icon: DisplaySettingsIcon,
    href: "/admin/pages/layout",
  },

];

export default Menuitems;
