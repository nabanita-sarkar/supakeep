import { ActionIcon, Avatar, Drawer, useMantineColorScheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { TbMenu2, TbMoonStars, TbSun } from "react-icons/tb";
import { Outlet } from "react-router-dom";
import { BREAKPOINTS } from "styles/theme";
// import CreateNew from "./components/CreateNew";
import Menu from "./components/Menu";
import styles from "./Layout.module.scss";

function SiderContent() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <div className={styles.institute}>
        <Avatar src={`/${colorScheme}-mode.svg`} size={32} radius="xl" />
        <h3>Supakeep</h3>
      </div>
      <Menu />
      <div className={styles.user}>
        <Avatar size={32} radius="xl" />
        <span className={styles.name}>Local</span>
        {/* <div>
          <p className={styles.name}>Nabanita Sarkar</p>
          <p className={styles.email}>nabanita.sarkar1418@gmail.com</p>
        </div>
        <ActionIcon size={32}>
          <TbLogout />
        </ActionIcon> */}
      </div>
    </>
  );
}

function Layout() {
  const { width } = useViewportSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (width > 0 && width >= BREAKPOINTS.md) setIsSidebarOpen(true);
  }, [width]);

  return (
    <div className={styles.container}>
      {width >= BREAKPOINTS.md ? (
        <aside className={!isSidebarOpen ? styles["sidebar-closed"] : styles["sidebar"]}>
          <SiderContent />
        </aside>
      ) : (
        <Drawer
          classNames={{ drawer: styles.sidebar, header: styles["drawer-header"], closeButton: styles["drawer-close"] }}
          opened={isSidebarOpen}
          onClose={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <SiderContent />
        </Drawer>
      )}
      <main className={!isSidebarOpen || width < BREAKPOINTS.md ? styles["main-full"] : ""}>
        <header>
          <div className={styles.left}>
            <ActionIcon aria-label="Toggle Sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <TbMenu2 />
            </ActionIcon>
            <h4>Notes</h4>
          </div>
          <div className={styles.right}>
            <ActionIcon aria-label="Toggle theme" onClick={() => toggleColorScheme()}>
              {colorScheme === "dark" ? <TbSun /> : <TbMoonStars />}
            </ActionIcon>
          </div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
