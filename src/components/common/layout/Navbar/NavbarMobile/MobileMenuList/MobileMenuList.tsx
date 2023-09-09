import { useContext } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  SwipeableDrawer,
  useTheme
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShopIcon from "@mui/icons-material/Shop";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { menuItems } from "../../../../../../router/navigation";
import useStyles from './MobileMenuListStyles';


import { logout } from "../../../../../../firebase/firebaseConfig";
import { AuthContext } from "../../../../../../context/AuthContext";


interface MobileMenuListProps {
  handleMenuToggle: () => void;
  isMenuOpen: boolean;
  container?: any;
  Top: string;
}

const MobileMenuList: React.FC<MobileMenuListProps> = ({
  handleMenuToggle,
  isMenuOpen,
  container,
  Top
}) => {

  const { logoutContext, isLogged, user } = useContext(AuthContext)!;
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;
  const classes = useStyles();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout();
    logoutContext();
    navigate("/login");
  };
  
  return (
    <SwipeableDrawer
      anchor="left"
      open={isMenuOpen}
      onClose={handleMenuToggle}
      onOpen={() => {}}
      container={container}
      sx={{
        display: { xs: "block" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 411,
          top: Top,
          backgroundColor: primaryColor,
          height: "100%",
          zIndex: 1300,
        },
      }}
    >
      <div>
        <List>
          {menuItems.map(({ id, path, title, Icon }) => {
            return (
              <Link key={id} to={path} onClick={handleMenuToggle}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                      <SvgIcon>
                        <Icon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText
                      primary={title}
                      primaryTypographyProps={{
                        className: classes.listItemText,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}

          {!isLogged ? (
            <Link to="/login" onClick={handleMenuToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon sx={{ color: theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Iniciar sesión"}
                    primaryTypographyProps={{
                      className: classes.listItemText,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : null}

          {isLogged && user.rol === rolAdmin && (
            <Link to="/dashboard" onClick={handleMenuToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon sx={{ color: theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Dashboard"}
                    primaryTypographyProps={{
                      className: classes.listItemText,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {isLogged && (
            <Link to="/user-orders" onClick={handleMenuToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShopIcon sx={{ color: theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Mis compras"}
                    primaryTypographyProps={{
                      className: classes.listItemText,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {isLogged && (
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Cerrar sesión"}
                  primaryTypographyProps={{
                    className: classes.listItemText,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default MobileMenuList;
