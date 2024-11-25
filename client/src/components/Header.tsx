import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { List, SignOut } from "@phosphor-icons/react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";

import useWindowSize from "../hooks/useSizeObserver";
import { logoutUser } from "../redux/user/actions";
import LoginModal from "./LoginModal";
import BaseButton from "./BaseButton";

function Header() {
  const [loggedUser, setLoggedUser] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const { currentUser } = useSelector(
    (state: any) => state.userReducer || {} // Certifique-se de acessar corretamente o campo `currentUser`
  );

  useEffect(() => {
    if (currentUser === null) {
      setLoggedUser(true);
    } else {
      setLoggedUser(false);
    }
  }, [currentUser]);

  function handleLogout() {
    dispatch(logoutUser());
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <LoginModal open={loggedUser} setOpen={setLoggedUser} />

      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Título */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6" component="h1">
              Shopper {width > 790 ? "- Desafio fullstack" : null}
            </Typography>
          </Box>

          {/* Sessão de Login */}
          <Box>
            {currentUser ? (
              <Box display="flex" alignItems="center" gap={2}>
                <Typography
                  variant="body1"
                  noWrap
                  sx={{ maxWidth: 150, textOverflow: "ellipsis" }}
                >
                  Olá, {currentUser}!
                </Typography>
                <IconButton color="inherit" onClick={handleLogout}>
                  <SignOut size={24} />
                </IconButton>
              </Box>
            ) : (
              <BaseButton
                color="inherit"
                variant="outlined"
                onClick={() => setLoggedUser(true)}
              >
                Entrar
              </BaseButton>
            )}
          </Box>

          {/* Menu de Navegação */}
          {width < 640 ? (
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <List size={32} />
            </IconButton>
          ) : (
            <Box display="flex" gap={2}>
              <Button color="inherit" component={Link} to="/">
                Início
              </Button>
              <Button color="inherit" component={Link} to="/viagens">
                Viagens
              </Button>
              <Button color="inherit" component={Link} to="/busca">
                Histórico
              </Button>
            </Box>
          )}

          {/* Menu Responsivo */}
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              Início
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/viagens">
              Viagens
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/busca">
              Histórico
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
