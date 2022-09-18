import { Button, useMantineColorScheme } from "@mantine/core";
import { ReactNode } from "react";
import { TbNotes } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import styles from "./Menu.module.scss";

interface MenuListItem {
  path: string;
  label: string;
  icon: ReactNode;
}

interface MenuItemProps extends Omit<MenuListItem, "type"> {
  active: boolean;
}

const menuList: MenuListItem[] = [
  {
    path: "/",
    label: "Notes",
    icon: <TbNotes />,
  },
];

function MenuItem({ path, label, icon, active }: MenuItemProps) {
  const { colorScheme: theme } = useMantineColorScheme();

  return (
    <Button
      leftIcon={icon}
      component={Link}
      to={path}
      variant="subtle"
      classNames={{
        root: styles[`menu-item-${active ? "active-" + theme : theme}`],
        label: styles["menu-label"],
        icon: styles["menu-icon"],
      }}
    >
      {label}
    </Button>
  );
}

export default function SidebarMenu() {
  const location = useLocation();
  const path = location?.pathname;

  return (
    <div className={styles.menu}>
      {menuList.map((menuItem) => {
        return <MenuItem {...menuItem} active={path === menuItem.path} key={menuItem.path} />;
      })}
    </div>
  );
}
