import {
  AppBar,
  Box,
  Divider,
  Drawer,
  GlobalStyles,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { createLink, createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const activeProps = {
  className: "Mui-selected",
};

const RouterItemButton = createLink(ListItemButton);

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <Box>
      <GlobalStyles
        styles={{
          body: {
            "--MainNav-height": "56px",
            "--MainNav-zIndex": 1300,
            "--SideNav-width": "280px",
            "--SideNav-zIndex": 1100,
            "--MobileNav-width": "320px",
            "--MobileNav-zIndex": 1100,
          },
        }}
      />
      <AppBar
        position="fixed"
        sx={{
          height: "var(--MainNav-height)",
          zIndex: "var(--MainNav-zIndex)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Phòng xét nghiệm Anh Quân
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "100%", height: "var(--MainNav-height)" }}></Box>
      <Drawer
        sx={{
          zIndex: 1000,
          width: "var(--SideNav-width)",
          "& .MuiDrawer-paper": {
            paddingTop: "var(--MainNav-height)",
            width: "var(--SideNav-width)",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        {navConfigs.map((navGroup) => (
          <List
            sx={{ mt: 2 }}
            component="nav"
            key={navGroup.key}
            subheader={<ListSubheader sx={{ fontWeight: 600 }}>{navGroup.header}</ListSubheader>}
          >
            {navGroup.items.map((item) => (
              <RouterItemButton sx={{ pr: 3 }} to={item.path} key={item.key} activeProps={activeProps}>
                <ListItemText>{item.label}</ListItemText>
              </RouterItemButton>
            ))}
          </List>
        ))}
        <Divider />
      </Drawer>

      <Box sx={{ ml: "var(--SideNav-width)", p: 3 }}>
        <Outlet />
      </Box>

      <TanStackRouterDevtools />
    </Box>
  );
}

export const navConfigs = [
  {
    key: "functions",
    header: "Chức năng",
    items: [{ key: "reports", path: "/reports", label: "Tạo phiếu xét nghiệm" }],
  },
  {
    key: "lists",
    header: "Danh mục",
    items: [
      { key: "customers", path: "/customers", label: "Danh mục khách hàng, bác sĩ" },
      { key: "tests", path: "/tests", label: "Danh mục xét nghiệm" },
      { key: "combos", path: "/combos", label: "Danh mục gói xét nghiệm" },
    ],
  },
];
